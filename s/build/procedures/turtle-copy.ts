
import {StdInputs} from "../parts/stdparams.js"
import {find_files} from "../../utils/find_files.js"
import {setup_loggers} from "../parts/setup_loggers.js"
import {copy_all_files} from "../routines/copy_all_files.js"

export async function turtleCopy({params}: StdInputs) {
	const loggers = setup_loggers(params)
	await copy_all_files(
		await find_files(
			params.in,
			["**/*.{ts,js}", ...params.exclude ?? []],
			"**/*",
		),
		params.out,
		loggers.on_file_copied,
	)
}

