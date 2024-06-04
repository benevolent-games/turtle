
import chokidar from "chokidar"
import {turtleCopy} from "./turtle-copy.js"
import {turtlePages} from "./turtle-pages.js"
import {StdInputs} from "../parts/stdparams.js"
import {turtleScripts} from "./turtle-scripts.js"

export async function turtleSsgWatch(o: StdInputs) {
	const {params} = o
	const dedupedDirs = [...new Set([...params.in, params.out])]
	const patterns = dedupedDirs
		.map(dir => `${dir}/**/*.{js,json,css}`)
	chokidar.watch(patterns).on("all", async() => {
		await turtleCopy(o)
		await turtleScripts(o)
		await turtlePages(o)
	})
}

