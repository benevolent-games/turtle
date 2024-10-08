
import {OnDeath} from "@benev/argv"

import {turtleCopy} from "../turtle-copy.js"
import {watch} from "../../../utils/watch.js"
import {turtlePages} from "../turtle-pages.js"
import {SsgInputs} from "../../parts/stdparams.js"
import {stdignore} from "../../parts/stdignore.js"
import {turtleScripts} from "../turtle-scripts.js"

export async function turtleSsgWatch(o: SsgInputs, onDeath: OnDeath) {
	const {params} = o

	const ignored = stdignore(params.exclude ?? [])
	const dirs = [...new Set([...params.in, params.out])]
	const patterns = ["**/*.{js,json,css}"]

	await watch(dirs, patterns, ignored, onDeath, async() => {
		await turtleCopy(o)
		await turtleScripts(o)
		await turtlePages(o)
	})
}

