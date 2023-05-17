
import {HtmlTemplate} from "./template.js"
import {TemplateBasics} from "../build/template_basics.js"

export type WebpageMaker = (basics: TemplateBasics) => Promise<HtmlTemplate>

export function webpage(maker: WebpageMaker) {
	return maker
}

