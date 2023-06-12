
import {Html} from "../html/template.js"
import {TemplateBasics} from "./types/template_basics.js"

export type Template<C> = (
	basics: TemplateBasics,
	context: C,
) => Promise<Html>

export function template<C>(t: Template<C>) {
	return t
}

