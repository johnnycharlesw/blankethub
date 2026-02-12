import type { AbstractBlankethubClient } from '@modrinth/api-client'

import { createContext } from './index'

export const [injectBlankethubClient, provideBlankethubClient] = createContext<AbstractBlankethubClient>(
	'root',
	'modrinthClient',
)
