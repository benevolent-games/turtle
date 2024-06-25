
import {ProcessOutput} from "zx"
import {color} from "@benev/argv"

export async function printZxErrors(fn: () => Promise<void>) {
	try {
		await fn()
	}
	catch (error) {
		if (error instanceof ProcessOutput) {
			console.error(
				color.red(error.text())
			)
		}
		else console.error("error:", error)
	}
}

