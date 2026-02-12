import type { AbstractBlankethubClient } from './abstract-client'

export abstract class AbstractModule {
	protected client: AbstractBlankethubClient

	public constructor(client: AbstractBlankethubClient) {
		this.client = client
	}

	/**
	 * Get the module's name, used for error reporting & for module field generation.
	 * @returns Module name
	 */
	public abstract getModuleID(): string
}
