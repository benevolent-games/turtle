
import {DistillParams, Params, list, param, string} from "@benev/argv"

export const stdparams = {

	in: param.required(list(string), {
		help: `
			input directories, comma-separated, no trailing slash.
			usually you'll provide both your "src" and "dist" directories when you have a typescript build, such that turtle can see your ".css" files in "src", but also your ".turtle.js" files in "dist".
		`,
	}),

	out: param.required(string, {
		help: `
			output directory, no trailing slash.
			this is where turtle will emit your html files and such.
		`,
	}),

	exclude: param.optional(list(string), {
		help: `
			list of glob patterns to ignore, so turtle will not process them.
		`,
	}),

	verbose: param.flag("-v", {
		help: `
			emit logging so you can see what's happening.
		`,
	}),

} satisfies Params

export type StdInputs<T extends Params = {}> = {
	params: DistillParams<typeof stdparams> & DistillParams<T>
}

