
import {turtle_script} from "../../build/turtle_script.js"

import page from "./page.partial.html.js"

// we'll stamp out a webpage for each of these values
const values = [1, 2]

// your default export must be a turtle_script
export default turtle_script(async({write_webpage}) => {

	// loop over each value
	await Promise.all(values.map(async(x) => {

		// write a webpage
		await write_webpage({

			// provide the page template
			template: page,

			// provide the x value in the context
			context: {x},

			// specify the destination relative
			// to this build script
			destination: `lol/${x}.html`,
		})
	}))
})

