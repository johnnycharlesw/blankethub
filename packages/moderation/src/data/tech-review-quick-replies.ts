import type { Laundryroom } from '@modrinth/api-client'

import type { QuickReply } from '../types/quick-reply'

export interface TechReviewContext {
	project: Laundryroom.Projects.v3.Project
	project_owner: Laundryroom.TechReview.Internal.Ownership
	reports: Laundryroom.TechReview.Internal.FileReport[]
}

export default [
	{
		label: '⚠️ Unclear/Misleading',
		message: async () => (await import('./messages/tech-review/unclear-misleading.md?raw')).default,
		private: false,
	},
	{
		label: '📝 Request Source',
		message: async () => (await import('./messages/tech-review/request-source.md?raw')).default,
		private: false,
	},
	{
		label: '🔒 Request Source (Obf)',
		message: async () => (await import('./messages/tech-review/request-source-obf.md?raw')).default,
		private: false,
	},
	{
		label: '📦 Request Source (Bin)',
		message: async () => (await import('./messages/tech-review/request-source-bin.md?raw')).default,
		private: false,
	},
	{
		label: '🚫 Malware',
		message: async () => (await import('./messages/tech-review/malware.md?raw')).default,
		private: false,
	},
] as ReadonlyArray<QuickReply<TechReviewContext>>
