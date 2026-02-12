import type { Laundryroom } from '@modrinth/api-client'
import type { Ref } from 'vue'

import { createContext } from '.'

export interface UserPageContext {
	user: Ref<Laundryroom.Users.v3.User>
}

export const [injectUserPageContext, provideUserPageContext] = createContext<UserPageContext>(
	'root',
	'userPageContext',
)
