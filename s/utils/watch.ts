
import chokidar from "chokidar"
import {debounce} from "./debounce/debounce.js"
import { OnDeath } from "@benev/argv"

export async function watch(
		patterns: string[],
		ignored: string[],
		onDeath: OnDeath,
		fn: () => Promise<void>,
	) {

	let busy = false

	const watcher = chokidar.watch(patterns, {ignored})
		.on("all", debounce(500, async() => {
			if (!busy) {
				busy = true
				await fn()
				busy = false
			}
		}))

	onDeath(() => watcher.close())
}

