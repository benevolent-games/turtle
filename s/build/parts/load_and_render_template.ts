
import {HtmlTemplate} from "../../html/template.js"
import { untab } from "../../html/untab.js"
import {TemplateBasics} from "../types/template_basics.js"
import {load_template_function} from "./load_template_function.js"

export async function load_and_render_template(
		template_path: string,
		basics: TemplateBasics,
		context: any,
	) {

	const template_function = await load_template_function(template_path)

	const template = await template_function(basics, context) as HtmlTemplate

	const result = untab(await template.render())
	return result.trim() + "\n"
}

