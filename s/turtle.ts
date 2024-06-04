
import {$} from "zx"
import {cli, command} from "@benev/argv"
import {stdparams} from "./build/parts/stdparams.js"
import {stdcommand} from "./build/parts/stdcommand.js"
import {turtleCopy} from "./build/procedures/turtle-copy.js"
import {turtlePages} from "./build/procedures/turtle-pages.js"
import {turtleBundles} from "./build/procedures/turtle-bundles.js"
import {turtleScripts} from "./build/procedures/turtle-scripts.js"

await cli(process.argv, {
	name: "🐢 turtle",
	help: `static site generator.`,
	commands: {

		ts: command({
			args: [],
			params: {
				out: stdparams.out,
				verbose: stdparams.verbose,
				exclude: stdparams.exclude,
			},
			async execute({params}) {
				await $`mkdir -p ${params.out}`
				await $`importly --host=node_modules < package-lock.json > ${params.out}/importmap.json`
				await $`ln -s $(realpath node_modules) ${params.out}/node_modules`
				await $`tsc`
				await turtleBundles(params.out, params.exclude)
			},
		}),

		web: stdcommand(async o => {
			await turtleCopy(o)
			await turtleScripts(o)
			await turtlePages(o)
		}),

		run: {
			copy: stdcommand(turtleCopy),
			scripts: stdcommand(turtleScripts),
			pages: stdcommand(turtlePages),
		},

	},
}).execute()

