import { useEditor, useToasts } from '@tldraw/tldraw'
import { useCallback } from 'react'
import { track } from '@vercel/analytics/react'
import { makeRealFlutter } from '../lib/makeRealFlutter'

export function useMakeReal() {
	const editor = useEditor()
	const toast = useToasts()

	return useCallback(async () => {
		const input = document.getElementById('openai_key_risky_but_cool') as HTMLInputElement
		const apiKey = input?.value ?? null

		track('make_real', { timestamp: Date.now() })

		try {
			await makeRealFlutter(editor, apiKey)
		} catch (e: any) {
			track('no_luck', { timestamp: Date.now() })

			console.error(e)
			toast.addToast({
				icon: 'cross-2',
				title: 'Something went wrong',
				description: `${e.message.slice(0, 100)}`,
			})
		}
	}, [editor, toast])
}
