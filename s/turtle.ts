#!/usr/bin/env node

import {$} from "zx"
import {cli, command} from "@benev/argv"
import {printZxErrors} from "./errors/print-zx-errors.js"
import {turtleCopy} from "./build/procedures/turtle-copy.js"
import {turtlePages} from "./build/procedures/turtle-pages.js"
import {ssgparams, buildparams} from "./build/parts/stdparams.js"
import {turtleBundles} from "./build/procedures/turtle-bundles.js"
import {turtleScripts} from "./build/procedures/turtle-scripts.js"
import {turtleSsgWatch} from "./build/procedures/watches/turtle-ssg-watch.js"
import {turtleBuildWatch} from "./build/procedures/watches/turtle-build-watch.js"

await cli(process.argv, {
	name: "turtle",
	help: `🐢 static site generator.`,
	commands: {

		build: command({
			help: `
				run a standard typescript app build.
				generate an importmap.json, create a symlink to node_modules, run your ts build, and bundle up your ".bundle.js" files to produce ".bundle.min.js" files.
			`,
			args: [],
			params: buildparams,
			async execute({params}) {
				printZxErrors(async() => {
					await $`mkdir -p "${params.out}"`
					await $`npx importly --host=node_modules < package-lock.json > "${params.out}/importmap.json"`
					await $`rm -f "${params.out}/node_modules"`
					await $`ln -s "$(realpath node_modules)" "${params.out}/node_modules"`
					await $`npx tsc`
					await turtleBundles(params.out, params.exclude)
				})
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
					turtleBuildWatch(o),
					turtleSsgWatch(o),
				])
			},
		}),

		"build-watch": command({
			args: [],
			params: buildparams,
			async execute(o) {
				await turtleBuildWatch(o)
			},
		}),

		"ssg-watch": command({
			args: [],
			params: ssgparams,
			async execute(o) {
				await turtleSsgWatch(o)
			},
		}),

	},
}).execute()

