import type { BlankethubServer } from '../modrinth-servers.ts'

export abstract class ServerModule {
	protected server: BlankethubServer

	constructor(server: BlankethubServer) {
		this.server = server
	}

	protected get serverId(): string {
		return this.server.serverId
	}

	abstract fetch(): Promise<void>
}
