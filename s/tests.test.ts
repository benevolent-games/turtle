
import {Suite, assert, expect} from "cynic"

import {nap} from "./utils/nap.js"
import {html} from "./html/html.js"
import {untab} from "./html/untab.js"
import {render} from "./html/render.js"
import {Html} from "./html/template.js"
import {unsanitized} from "./html/unsanitized.js"
import {PathRouter} from "./build/parts/path/path_router.js"
import {apply_file_hash_to_url} from "./utils/hashing/apply_file_hash_to_url.js"

export default <Suite>{

	"ergonomics": {
		async "null and undefined injections do nothing"() {
			const expectedResult = "hello world"
			expect(html`hello${null} world`.toString()).equals(expectedResult)
			expect(html`hello${undefined} world`.toString()).equals(expectedResult)
			expect(html`hello${""} world`.toString()).equals(expectedResult)
		},
	},

	"async": {
		async "injected promises are resolved"() {
			const expectedResult = "hello world!"
			const promise = Promise.resolve("world!")
			expect(await html`hello ${promise}`.render()).equals(expectedResult)
		},
		async "injected promises can be nested"() {
			const expectedResult = "hello world!"
			const promise1 = Promise.resolve("world!")
			const promise2 = Promise.resolve(html`${promise1}`)
			expect(await html`hello ${promise2}`.render()).equals(expectedResult)
		},
		async "injected promises are sanitized"() {
			const promise = Promise.resolve("<script>")
			expect((await html`hello ${promise}`.render()).includes("<script>")).not.ok()
		},
		async "non-promise values can be rendered via async render"() {
			expect(await html`hello ${"world!"}`.render()).equals("hello world!")
		},
		async "multiple injections are ordered correctly"() {
			expect(await html`hello ${"world"}, ${"lmao"}`.render())
				.equals("hello world, lmao")
			const slowPromise = nap(10).then(() => "hello")
			const fastPromise = Promise.resolve("world")
			expect(await html`${slowPromise} ${fastPromise}!`.render())
				.equals("hello world!")
		},
	},

	"sanitization": async() => {
		const isSanitized = (t: Html) => !render(t).includes("<script>")
		return {
			async "template itself is not sanitized"() {
				expect(!isSanitized(html`<script></script>`)).ok()
			},
			async "injected values are sanitized"() {
				expect(isSanitized(html`${"<script>"}`)).ok()
			},
			async "nested injected values are sanitized"() {
				expect(isSanitized(html`${html`${"<script>"}`}`)).ok()
			},
			async "injected array values are sanitized"() {
				expect(isSanitized(html`${["<script>"]}`)).ok()
			},
			async "object keys are sanitized"() {
				expect(isSanitized(html`${{"<script>": true}}`)).ok()
			},
			async "object values are sanitized"() {
				expect(isSanitized(html`${{a: "<script>"}}`)).ok()
			},
			async "object toString result is sanitized"() {
				expect(isSanitized(html`${{toString() {return "<script>"}}}`)).ok()
			},
		}
	},

	"nesting": {
		"nested html functions must not be sanitized": async () => {
			const input = html`${html`<div></div>`}`
			const output = "<div></div>"
			assert(render(input) === output, "nested html function is sanitized")
		},
		"multiple html functions can be nested": async () => {
			const input = html`${html`${html`${html`<div></div>`}`}`}`
			const output = "<div></div>"
			expect(render(input)).equals(output)
		},
		"nested injected values are sanitized": async () => {
			const input = html`${html`${`<script></script>`}`}`
			const output = "&lt;script&gt;&lt;/script&gt;"
			assert(render(input) === output, "nested injected values are not sanitized")
		}
	},

	"arrays": {
		async "arrays of values are joined together cleanly"() {
			const items = ["alpha", "bravo"]
			const output = render(html`${items}`)
			assert(output === "alphabravo", "arrays should be cleanly joined")
		},
	},

	"versioning": {
		async "adds file hash to url"() {
			const url = "index.js"
			const filepath = "x/index.js"
			const result = await apply_file_hash_to_url({url, filepath})
			assert(
				/(\S+)\?v=\S{8,64}/.test(result),
				"url is versioned with hash",
			)
		},
		async "adds file hash to url that already has a querystring"() {
			const url = "index.js?lol=rofl"
			const filepath = "x/index.js"
			const result = await apply_file_hash_to_url({url, filepath})
			assert(
				/(\S+)\?lol=rofl&v=\S{8,64}/.test(result),
				"url is versioned with hash",
			)
		},
	},

	"untab": {
		async "handles string without any tabbing"() {
			expect(untab("lol")).equals("lol")
		},
		async "removes leading tabs from input"() {
			const result1 = untab(`
				lol
			`)
			const result2 = untab(`
				lol
				rofl
			`)
			expect(result1).equals("\nlol\n")
			expect(result2).equals("\nlol\nrofl\n")
		},
		async "retains nested tabbing"() {
			expect(
				untab(`
					lol
						rofl
							kek
					lmao
				`)
			).equals("\nlol\n\trofl\n\t\tkek\nlmao\n")
			expect(
				untab(`
					lol

						rofl\n\t\t
							kek
					lmao
				`)
			).equals("\nlol\n\n\trofl\n\n\t\tkek\nlmao\n")
		},
	},

	"unsanitized": {
		async "unsanitized values are not sanitized"() {
			const value = "script"
			const result = html`${unsanitized(value)}`
			expect(result.toString()).equals(value)
		},
	},

	"path routing": async() => {
		const url = "file:///home/chase/work/@benev/turtle/x/demo/stamping/stamp.partial.html.js"
		const path = PathRouter.make_path_routing_function({
			web_root_for_output: "/home/chase/work/@benev/turtle/x/demo",
			destination_path: "/home/chase/work/@benev/turtle/x/demo/lol/2.html",
		})

		return {
			async "root can traverse up one level (../)"() {
				expect(path(url).root("style.css")).equals("../style.css")
			},

			async "local can find its way back to module's directory"() {
				const url = "file:///home/chase/work/@benev/turtle/x/demo/stamping/stamp.partial.html.js"
				const path = PathRouter.make_path_routing_function({
					web_root_for_output: "/home/chase/work/@benev/turtle/x/demo",
					destination_path: "/home/chase/work/@benev/turtle/x/demo/lol/2.html",
				})
				expect(path(url).local("style.css")).equals("../stamping/style.css")
			},

			async "dest just returns the same path"() {
				const url = "file:///home/chase/work/@benev/turtle/x/demo/stamping/stamp.partial.html.js"
				const path = PathRouter.make_path_routing_function({
					web_root_for_output: "/home/chase/work/@benev/turtle/x/demo",
					destination_path: "/home/chase/work/@benev/turtle/x/demo/lol/2.html",
				})
				expect(path(url).dest("style.css")).equals("style.css")
			},
		}
	},
}

