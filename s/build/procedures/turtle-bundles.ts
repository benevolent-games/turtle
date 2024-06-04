
import {$} from "zx"
import {globby} from "globby"

export async function turtleBundles(cwd: string, ignore: string[] = []) {
	const bundles = await globby(["**/*.bundle.js"], {cwd, ignore})
	for (const bundle of bundles) {
		const bundled = bundle.replace(".bundle.js", ".bundled.js")
		const bundledMin = bundle.replace(".bundle.js", ".bundled.min.js")
		await $`
			npx rollup ${bundle} \
				-p @rollup/plugin-node-resolve \
				-p @rollup/plugin-wasm \
				--format es \
				--file ${bundled}
		`
		await $`
			npx terser ${bundled} \
				--module \
				--compress \
				--mangle \
				--source-map \
				--comments false \
				-o ${bundledMin}
		`
	}
}

