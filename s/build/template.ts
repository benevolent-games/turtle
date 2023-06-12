
import {HtmlTemplate} from "../html/template"
import {TemplateBasics} from "./types/template_basics.js"

export type WebTemplate<C> = (
	basics: TemplateBasics,
	context: C,
) => Promise<HtmlTemplate>

export function template<C>(t: WebTemplate<C>) {
	return t
}

