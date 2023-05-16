
import {escape_html} from "../utils/escape_html.js"

export type HtmlTemplateOptions = {
	strings: TemplateStringsArray | string[]
	values: any[]
}

export class HtmlTemplate {
	#strings: string[]
	#values: any[]

	constructor({strings, values}: HtmlTemplateOptions) {
		this.#strings = [...strings]
		this.#values = values
	}

	#process_value(value: any): string {
		return value instanceof HtmlTemplate
			? value.toString()
			: escape_html(value.toString())
	}

	async #process_async_value(value: any): Promise<string> {
		return value instanceof HtmlTemplate
			? await value.render()
			: escape_html(value.toString())
	}

	toString() {
		return this.#strings.reduce(
			(previous, current, index) => {
				const value = this.#values[index] ?? ""
				const safeValue = Array.isArray(value)
					? value.map(this.#process_value).join("")
					: this.#process_value(value)
				return previous + current + safeValue
			},
			""
		)
	}

	async render() {
		const results = await Promise.all(this.#strings.map(async(string, index) => {
			const value = await this.#values[index] ?? ""
			const safeValue = Array.isArray(value)
				? (await Promise.all(value.map(this.#process_async_value))).join("")
				: await this.#process_async_value(value)
			return string + safeValue
		}))
		return results.join("")
	}
}

