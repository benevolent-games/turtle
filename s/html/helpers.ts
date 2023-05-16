
import {html} from "./html.js"

export function attrMaybe(attr: string, value: string | undefined) {
	return value !== undefined
		? html`${attr}="${value}"`
		: ""
}

export function attrBool(attr: string, value: boolean) {
	return value
		? attr
		: ""
}

export function maybe<V>(value: V, realize: (value: V) => any) {
	return value
		? realize(value)
		: undefined
}

