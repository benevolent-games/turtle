#!/usr/bin/env node

import {Path} from "./utils/path.js"
import {cli, color} from "@benev/argv"
import {build_website} from "./build/build_website.js"
import {WebsiteLoggers} from "./build/types/loggers.js"

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
		renders .html.js template files into html.
		executes .turtle.js script files.
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

const loggers: WebsiteLoggers = params.verbose
	? (() => {

		function log(icon: string) {
			return (source: Path, target: Path) => {
				const from = color.cyan(source.relative)
				const sep = color.blue("-->")
				const to = color.magenta(target.relative)
				console.log([color.blue(icon), from, sep, to].join(" "))
			}
		}

		return {
			on_file_copied: log("copied"),
			on_file_written: log("rendered"),
			on_turtle_script_executed(path) {
				console.log([
					color.blue("executed"),
					color.cyan(path.relative),
				].join(" "))
			},
		}
	})()
	: {}

if (params.verbose)
	console.log(program_name)

await build_website({
	context: {},
	input_directories: params.in.split(":"),
	output_directory: params.out,
	excludes: params.excludes?.split(":") ?? [],
	...loggers,
})

