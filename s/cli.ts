
import {Path} from "./utils/path.js"
import {cli, color} from "@benev/argv"
import {build_website} from "./build/website.js"

const program_name = color.green("🐢 @benev/turtle")

export type Args = {}

export type Params = {
	in: string
	out: string
	excludes: string
	verbose: boolean
}

const {params} = cli<Args, Params>()({
	program: program_name,
	argv: process.argv,
	columns: process.stdout.columns ?? 72,
	readme: "https://github.com/benevolent-games/turtle#readme",
	help: `
		static site generator.
		consumes .html.js template files.
		copies all other files.
	`.trim(),
	tips: false,

	argorder: [],
	args: {},
	params: {
		in: {
			type: String,
			mode: "requirement",
			help: "source directory with your templates and css files and such (multiple directories can be separated by colons)",
		},
		out: {
			type: String,
			mode: "requirement",
			help: "target directory to generate the website into",
		},
		excludes: {
			type: String,
			mode: "option",
			help: "files to ignore (glob patterns, separated by colons)",
		},
		verbose: {
			type: Boolean,
			mode: "default",
			default: false,
			help: "print information about what's happening",
		},
	},
})

function log(icon: string) {
	return function(source: Path, target: Path) {
		if (params.verbose) {
			const from = color.cyan(source.relative)
			const sep = color.blue("-->")
			const to = color.magenta(target.relative)
			console.log([color.blue(icon), from, sep, to].join(" "))
		}
	}
}

if (params.verbose)
	console.log(program_name)

await build_website({
	context: {},
	input_directories: params.in.split(":"),
	output_directory: params.out,
	excludes: params.excludes?.split(":") ?? [],
	on_file_copy: log("copy"),
	on_file_write: log("render"),
})

