
import {ProcessOutput} from "zx"
import {ExecutionError} from "@benev/argv"

export async function handleZxErrors(fn: () => Promise<void>) {
	try {
		await fn()
	}
	catch (error) {
		if (error instanceof ProcessOutput)
			throw new ExecutionError(error.text())
		else
			throw new ExecutionError(`error: ${JSON.stringify(error)}`)
	}
}

