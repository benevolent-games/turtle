
import {$} from "zx"
import {OnDeath} from "@benev/argv"
import {BuildInputs} from "../../parts/stdparams.js"

export async function turtleBuildWatch({}: BuildInputs, onDeath: OnDeath) {
	const process = $.spawn("tsc", ["-w"], {stdio: "inherit"})
	onDeath(() => process.kill())
}

