
import {$} from "zx"
import {BuildInputs} from "../../parts/stdparams.js"

export async function turtleBuildWatch({}: BuildInputs) {
	$.spawn("tsc", ["-w"], {stdio: "inherit"})
}

