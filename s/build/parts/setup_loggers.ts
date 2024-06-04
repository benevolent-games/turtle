
import {color} from "@benev/argv"
import {Path} from "../../utils/path.js"
import {WebsiteLoggers} from "../types/loggers.js"

function log(icon: string) {
	return (source: Path, target: Path) => {
		const from = color.cyan(source.relative)
		const sep = color.blue("-->")
		const to = color.magenta(target.relative)
		console.log([color.blue(icon), from, sep, to].join(" "))
	}
}

export const setup_loggers = ({verbose}: {
		verbose: boolean
	}): WebsiteLoggers => {

	return (verbose

		? {
			on_file_copied: log("copied"),
			on_file_written: log("rendered"),
			on_turtle_script_executed(path) {
				console.log([
					color.blue("executed"),
					color.cyan(path.relative),
				].join(" "))
			},
		}

		: {
			on_file_copied: () => {},
			on_file_written: () => {},
			on_turtle_script_executed: () => {},
		}
	)
}

