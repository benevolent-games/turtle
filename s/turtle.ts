#!/usr/bin/env node

import {$} from "zx"
import {cli, command} from "@benev/argv"
import {ssgparams, buildparams} from "./build/parts/stdparams.js"
import {turtleCopy} from "./build/procedures/turtle-copy.js"
import {turtlePages} from "./build/procedures/turtle-pages.js"
import {turtleBundles} from "./build/procedures/turtle-bundles.js"
import {turtleScripts} from "./build/procedures/turtle-scripts.js"
import {turtleSsgWatch} from "./build/procedures/watches/turtle-ssg-watch.js"

await cli(process.argv, {
	name: "turtle",
	help: `🐢 static site generator.`,
	commands: {

		build: command({
			help: `
				run a standard typescript app build.
				generate an importmap.json, create a symlink to node_modules, run your ts build, and bundle up your ".bundle.js" files to produce ".bundled.min.js" files.
			`,
			args: [],
			params: buildparams,
			async execute({params}) {
				await $`mkdir -p "${params.out}"`
				await $`npx importly --host=node_modules < package-lock.json > "${params.out}/importmap.json"`
				await $`rm -f "${params.out}/node_modules"`
				await $`ln -s "$(realpath node_modules)" "${params.out}/node_modules"`
				await $`npx tsc`
				await turtleBundles(params.out, params.exclude)
			},
		}),

		ssg: command({
			help: `
				run the turtle static site generator.
				copy files, run ".turtle.js" scripts, and build ".html.js" turtle pages.
			`,
			args: [],
			params: ssgparams,
			async execute(o) {
				await turtleCopy(o)
				await turtleScripts(o)
				await turtlePages(o)
			},
		}),

		watch: command({
			args: [],
			params: ssgparams,
			async execute(o) {
				await Promise.all([
					$`tsc -w`,
					turtleSsgWatch(o),
				])
			},
		}),

		"build-watch": command({
			args: [],
			params: {},
			async execute() {
				await $`tsc -w`
			},
		}),

		"ssg-watch": command({
			args: [],
			params: ssgparams,
			async execute(o) {
				await turtleSsgWatch(o)
			},
		}),

		// run: {
		// 	copy: stdcommand(turtleCopy),
		// 	scripts: stdcommand(turtleScripts),
		// 	pages: stdcommand(turtlePages),
		// },

	},
}).execute()

