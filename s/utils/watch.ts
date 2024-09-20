
import chokidar from "chokidar"
import {minimatch} from "minimatch"
import {OnDeath} from "@benev/argv"

import {debounce} from "./debounce/debounce.js"

export async function watch(
		dirs: string[],
		patterns: string[],
		ignored: string[],
		onDeath: OnDeath,
		fn: () => Promise<void>,
	) {

	let busy = false

	const isAllowed = (path: string) => {
		const isIgnored = ignored
			.flatMap(pattern => [pattern, pattern + "/**"])
			.some(pattern => minimatch(path, pattern))

		const isMatching = patterns
			.flatMap(pattern => [pattern, pattern + "/**"])
			.some(pattern => minimatch(path, pattern))

		return isMatching && !isIgnored
	}

	const watcher = chokidar.watch(dirs, {ignored: isAllowed})
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

