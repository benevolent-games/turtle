
import {DistillParams, Params, list, param, string} from "@benev/argv"

export const stdparams = {
	verbose: param.flag("-v"),
	in: param.required(list(string)),
	out: param.required(string),
	exclude: param.optional(list(string)),
} satisfies Params

export type StdInputs<T extends Params = {}> = {
	params: DistillParams<typeof stdparams> & DistillParams<T>
}

