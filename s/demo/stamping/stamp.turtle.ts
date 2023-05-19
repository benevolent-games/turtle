
import {write_webpage} from "../../build/webpage.js"
import {turtle_script} from "../../build/turtle_script.js"

import page, {StampContext} from "./page.partial.html.js"

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export default turtle_script(async(meta) => {
	await Promise.all(values.map(async(x) => {
		await write_webpage<StampContext>({
			meta,
			destination: `${x}.html`,
			context: {x},
			template: page,
		})
	}))
})

