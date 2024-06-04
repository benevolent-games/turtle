
import chokidar from "chokidar"
import {turtleCopy} from "../turtle-copy.js"
import {turtlePages} from "../turtle-pages.js"
import {SsgInputs} from "../../parts/stdparams.js"
import {stdignore} from "../../parts/stdignore.js"
import {turtleScripts} from "../turtle-scripts.js"
import {debounce} from "../../../utils/debounce/debounce.js"

export async function turtleSsgWatch(o: SsgInputs) {
	const {params} = o

	const ignored = stdignore([])
	const dedupedDirs = [...new Set([...params.in, params.out])]
	const patterns = dedupedDirs
		.map(dir => `${dir}/**/*.{js,json,css}`)

	chokidar.watch(patterns, {ignored}).on("all", debounce(500, async() => {
		await turtleCopy(o)
		await turtleScripts(o)
		await turtlePages(o)
	}))
}


