
import {command} from "@benev/argv"
import {StdInputs, stdparams} from "./stdparams.js"

export function stdcommand(execute: (inputs: StdInputs) => Promise<void>, help?: string) {
	return command({
		args: [],
		params: stdparams,
		execute,
		help,
	})
}

