import type { BlankethubServerError } from '../errors'

export interface V1ErrorInfo {
	context?: string
	error: string
	description: string
}

export interface JWTAuth {
	url: string
	token: string
}

export interface ModuleError {
	error: BlankethubServerError
	timestamp: number
}

export type ModuleName = 'general' | 'content' | 'network' | 'startup'
