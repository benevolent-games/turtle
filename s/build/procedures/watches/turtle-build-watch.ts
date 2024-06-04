
import {$} from "zx"
// import chokidar from "chokidar"
// import {stdignore} from "../../parts/stdignore.js"
// import {turtleBundles} from "../turtle-bundles.js"
import {BuildInputs} from "../../parts/stdparams.js"
// import {debounce} from "../../../utils/debounce/debounce.js"

export async function turtleBuildWatch({params}: BuildInputs) {
	// const pattern = `${params.out}/**/*.js`
	// const ignored = [
	// 	...stdignore(params.exclude ?? []),
	// 	`**/*.bundled.js`,
	// 	`**/*.bundled.min.js`,
	// ]

	$`tsc -w`

	// chokidar.watch(pattern, {ignored})
	// 	.on("all", debounce(5000, async() => {
	// 		await turtleBundles(params.out, params.exclude)
	// 	}))
}

