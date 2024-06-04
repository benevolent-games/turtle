
import {SsgInputs} from "../parts/stdparams.js"
import {stdignore} from "../parts/stdignore.js"
import {find_files} from "../../utils/find_files.js"
import {setup_loggers} from "../parts/setup_loggers.js"
import {copy_all_files} from "../routines/copy_all_files.js"

export async function turtleCopy({params}: SsgInputs) {
	const loggers = setup_loggers(params)

	await copy_all_files(
		await find_files(
			params.in,
			stdignore(["**/*.{ts,js}", ...params.exclude ?? []]),
			"**/*",
		),
		params.out,
		loggers.on_file_copied,
	)
}

