
import {turtle_script} from "../../build/turtle_script.js"

import page from "./page.partial.html.js"

const values = [1, 2]

export default turtle_script(async({write_webpage}) => {
	await Promise.all(values.map(async(x) => {
		await write_webpage({
			template: page,
			context: {x},
			destination: `${x}.html`,
		})
	}))
})

