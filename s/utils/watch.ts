
import chokidar from "chokidar"
import {debounce} from "./debounce/debounce.js"

export async function watch(
		patterns: string[],
		ignored: string[],
		fn: () => Promise<void>,
	) {

	let busy = false

	chokidar.watch(patterns, {ignored})
		.on("all", debounce(500, async() => {
			if (!busy) {
				busy = true
				await fn()
				busy = false
			}
		}))
}

