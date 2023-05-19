
import {HtmlTemplate} from "./template.js"
import {TemplateBasics} from "../build/types/template_basics.js"

export type WebpageMaker<C extends {}> = (basics: TemplateBasics, context: C) => Promise<HtmlTemplate>

export function webpage<C extends {}>(maker: WebpageMaker<C>) {
	return maker
}

