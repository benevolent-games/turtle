
import chokidar from "chokidar"
import {OnDeath} from "@benev/argv"
import {debounce} from "./debounce/debounce.js"

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
				try {
					await fn()
				}
				catch (error) {}
				finally {
					busy = false
				}
			}
		}))

	onDeath(() => watcher.close())
}

