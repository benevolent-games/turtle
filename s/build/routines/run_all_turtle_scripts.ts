
import {Path} from "../../utils/path.js"
import {ScriptMeta} from "../types/script_meta.js"
import {write_webpage} from "../parts/write_webpage.js"
import {OutputLogger, TurtleScriptLogger} from "../types/loggers.js"

export async function run_all_turtle_scripts(
		paths: Path[],
		output_directory: string,
		on_file_written: OutputLogger,
		on_turtle_script_executed: TurtleScriptLogger,
	) {

	await Promise.all(
		paths.map(
			async path => {
				const script = await import(path.absolute)
				const meta: ScriptMeta = {
					path,
					on_file_written,
					output_directory,
					write_webpage: async({template, context, destination}) => {
						await write_webpage<typeof context>({
							path,
							output_directory,
							context,
							template,
							destination,
							on_file_written,
						})
					},
				}
				await script.default(meta)
				on_turtle_script_executed(path)
			}
		)
	)
}

