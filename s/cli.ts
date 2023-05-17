
import {Path} from "./utils/path.js"
import {cli, color} from "@benev/argv"
import {build_website} from "./build/website.js"

export type Args = {
	indirs: string
	outdir: string
}

export type Params = {
	excludes: string
}

const {args, params} = cli<Args, Params>()({
	program: "@benev/turtle",
	argv: process.argv,
	columns: process.stdout.columns ?? 72,
	readme: "https://github.com/benevolent-games/turtle#readme",
	tips: false,

	argorder: ["indirs", "outdir"],

	args: {
		indirs: {
			type: String,
			mode: "requirement",
			help: "directory to find your webpage templates (multiple directories can be separated by colons)",
		},
		outdir: {
			type: String,
			mode: "requirement",
			help: "directory to generate the website into",
		},
	},

	params: {
		excludes: {
			type: String,
			mode: "option",
			help: "glob patterns to exclude, separated by colons",
		},
	},
})

function log(inpath: Path, outpath: Path) {
	const from = color.cyan(inpath.relative)
	const sep = color.blue("-->")
	const to = color.magenta(outpath.relative)
	console.log([from, sep, to].join(" "))
}

await build_website({
	context: {},
	input_directories: args.indirs.split(":"),
	output_directory: args.outdir,
	excludes: params.excludes?.split(":") ?? [],
	on_file_copy: log,
	on_file_write: log,
})

