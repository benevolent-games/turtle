
import {$} from "zx"
import {dirname} from "path"
import {globby} from "globby"
import {stdignore} from "../parts/stdignore.js"

export async function turtleBundles(cwd: string, excludes: string[] = []) {
	const ignore = stdignore(excludes)
	const bundles = await globby(["**/*.bundle.js"], {cwd, ignore})

	for (const relativePath of bundles) {
		const bundle = `${cwd}/${relativePath}`
		await $`
			npx rollup ${bundle} \
				-p @rollup/plugin-node-resolve \
				-p @rollup/plugin-wasm \
				-p @rollup/plugin-terser \
				--format es \
				--dir ${dirname(bundle)} \
				--entryFileNames "[name].min.js"
		`
	}
}

