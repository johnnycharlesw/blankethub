import type { ApiErrorData, BlankethubErrorResponse } from '../types/errors'
import { isBlankethubErrorResponse } from '../types/errors'

/**
 * Base error class for all Blankethub API errors
 */
export class BlankethubApiError extends Error {
	/**
	 * HTTP status code (if available)
	 */
	readonly statusCode?: number

	/**
	 * Original error that was caught
	 */
	readonly originalError?: Error

	/**
	 * Response data from the API (if available)
	 */
	readonly responseData?: unknown

	/**
	 * Error context (e.g., module name, operation being performed)
	 */
	readonly context?: string

	constructor(message: string, data?: ApiErrorData) {
		super(message)
		this.name = 'BlankethubApiError'

		this.statusCode = data?.statusCode
		this.originalError = data?.originalError
		this.responseData = data?.responseData
		this.context = data?.context

		// Maintains proper stack trace for where our error was thrown (only available on V8)
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, BlankethubApiError)
		}
	}

	/**
	 * Create a BlankethubApiError from an unknown error
	 */
	static fromUnknown(error: unknown, context?: string): BlankethubApiError {
		if (error instanceof BlankethubApiError) {
			return error
		}

		if (error instanceof Error) {
			return new BlankethubApiError(error.message, {
				originalError: error,
				context,
			})
		}

		return new BlankethubApiError(String(error), { context })
	}
}

/**
 * Error class for Blankethub server errors (kyros/archon)
 * Extends BlankethubApiError with V1 error response parsing
 */
export class BlankethubServerError extends BlankethubApiError {
	/**
	 * V1 error information (if available)
	 */
	readonly v1Error?: BlankethubErrorResponse

	constructor(message: string, data?: ApiErrorData & { v1Error?: BlankethubErrorResponse }) {
		// If we have a V1 error, format the message nicely
		let errorMessage = message
		if (data?.v1Error) {
			errorMessage = `[${data.v1Error.error}] ${data.v1Error.description}`
			if (data.v1Error.context) {
				errorMessage = `${data.v1Error.context}: ${errorMessage}`
			}
		}

		super(errorMessage, data)
		this.name = 'BlankethubServerError'
		this.v1Error = data?.v1Error

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, BlankethubServerError)
		}
	}

	/**
	 * Create a BlankethubServerError from response data
	 */
	static fromResponse(
		statusCode: number,
		responseData: unknown,
		context?: string,
	): BlankethubServerError {
		const v1Error = isBlankethubErrorResponse(responseData) ? responseData : undefined

		let message = `HTTP ${statusCode}`
		if (v1Error) {
			message = v1Error.description
		} else if (typeof responseData === 'string') {
			message = responseData
		}

		return new BlankethubServerError(message, {
			statusCode,
			responseData,
			context,
			v1Error,
		})
	}

	/**
	 * Create a BlankethubServerError from an unknown error
	 */
	static fromUnknown(error: unknown, context?: string): BlankethubServerError {
		if (error instanceof BlankethubServerError) {
			return error
		}

		if (error instanceof BlankethubApiError) {
			return new BlankethubServerError(error.message, {
				statusCode: error.statusCode,
				originalError: error.originalError,
				responseData: error.responseData,
				context: context ?? error.context,
			})
		}

		if (error instanceof Error) {
			return new BlankethubServerError(error.message, {
				originalError: error,
				context,
			})
		}

		return new BlankethubServerError(String(error), { context })
	}
}
