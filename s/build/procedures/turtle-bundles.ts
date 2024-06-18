
import {$} from "zx"
import {dirname} from "path"
import {globby} from "globby"
import {stdignore} from "../parts/stdignore.js"

export async function turtleBundles(cwd: string, excludes: string[] = []) {
	const ignore = stdignore(excludes)
	const bundles = await globby(["**/*.bundle.js"], {cwd, ignore})

	for (const relativePath of bundles) {
		const bundle = `${cwd}/${relativePath}`
		const bundled = bundle.replace(".bundle.js", ".bundled.js")
		await $`
			npx rollup ${bundle} \
				-p @rollup/plugin-node-resolve \
				-p @rollup/plugin-wasm \
				-p @rollup/plugin-terser \
				--format es \
				--dir ${dirname(bundled)} \
				--entryFileNames "[name].min.js"
		`
		// await $`
		// 	npx terser ${bundled} \
		// 		--module \
		// 		--compress \
		// 		--mangle \
		// 		--source-map \
		// 		--comments false \
		// 		-o ${bundledMin}
		// `
	}
}

