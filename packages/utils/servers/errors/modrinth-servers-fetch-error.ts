export class BlankethubServersFetchError extends Error {
	constructor(
		message: string,
		public statusCode?: number,
		public originalError?: Error,
	) {
		super(message)
		this.name = 'BlankethubFetchError'
	}
}
