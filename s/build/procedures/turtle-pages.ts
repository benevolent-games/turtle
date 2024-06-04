
import {StdInputs} from "../parts/stdparams.js"
import {find_files} from "../../utils/find_files.js"
import {build_all_webpages} from "../routines/build_all_webpages.js"

export async function turtlePages({params}: StdInputs) {
	await build_all_webpages(
		await find_files(
			params.in,
			params.exclude ?? [],
			"**/*.html.js",
		),
		params.out,
		{},
		() => {},
	)
}

