
import {Path} from "../../utils/path.js"
import {log_error} from "../../utils/log_error.js"
import {ScriptMeta} from "../types/script_meta.js"
import {write_webpage} from "../parts/write_webpage.js"
import {OutputLogger, TurtleScriptLogger} from "../types/loggers.js"

export async function run_all_turtle_scripts(
		paths: Path[],
		output_directory: string,
		on_file_written: OutputLogger,
		on_turtle_script_executed: TurtleScriptLogger,
	) {

	const handy_write_webpage = (path: Path): ScriptMeta["write_webpage"] => (
		async({template, context, destination}) => {
			try {
				await write_webpage<typeof context>({
					path,
					context,
					template,
					destination,
					on_file_written,
					output_directory,
				})
			}
			catch (error) {
				log_error(error, "rendering", destination)
			}
		}
	)

	async function execute_script(path: Path) {
		try {
			const script = await import(path.absolute)
			const meta: ScriptMeta = {
				path,
				on_file_written,
				output_directory,
				write_webpage: handy_write_webpage(path),
			}
			await script.default(meta)
			on_turtle_script_executed(path)
		}
		catch (error) {
			log_error(error, "executing", path.relative)
		}
	}

	await Promise.all(paths.map(execute_script))
}

