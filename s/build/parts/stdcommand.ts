
import {command} from "@benev/argv"
import {SsgInputs, ssgparams} from "./stdparams.js"

export function stdcommand(execute: (inputs: SsgInputs) => Promise<void>, help?: string) {
	return command({
		args: [],
		params: ssgparams,
		execute,
		help,
	})
}

