
# 🐢 `@benev/turtle`

*slow and steady static site generator*

- turtle is a one-line command that generates a website
- you write html templates in plain javascript
- templates are just async functions, so you can do *anything*
- you can kind of imagine it like some kind of static javascript "php"
- turtle also copies other files like css and whatnot
- turtle has proper typescript typings

<br/>

## turtle turtorial

note, turtle doesn't care whether you use typescript or plain javascript, but in the examples here i'll be using the two interchangeably.

<br/>

### run turtle to generate a website

```sh
npx @benev/turtle --in="s/demo:x/demo" --out="x/demo" --verbose="true"
```

![image: turtle example output](https://i.imgur.com/IpAi0rF.png)

<br/>

### ask turtle for help

```sh
npx @benev/turtle --help
```

![image: turtle help page](https://i.imgur.com/Zpf4Iqk.png)

<br/>

### write your first webpage template, like `index.html.js`

turtle will sniff out your `.html.js` files, and render them into html pages.

```js
import {webpage, html} from "@benev/turtle"

export default webpage(async({v}) => html`
  <!doctype html>
  <html>
    <head>
      <title>@benev/turtle</title>
      <link rel="stylesheet" href="${v("/style.css")}"/>
    </head>
    <body>
      <h1>@benev/turtle</h1>
    </body>
  </html>
`)
```

<br/>

### you can write template partials

it can accept a context object

you tell turtle to ignore it with `--exclude="**/*.partial.html.js"`

`page.partial.html.ts`

```ts
import {webpage, html} from "@benev/turtle"

export default webpage<{x: number}>(async({v}, {x}) => html`

	<!doctype html>
	<html>
		<head>
			<meta charset="utf-8"/>
			<title>@benev/turtle - stamp test</title>
			<link rel="stylesheet" href="${v("/style.css")}"/>
		</head>
		<body>
			<h1>@benev/turtle - stamp test</h1>
			<p>${x}</p>
		</body>
	</html>

`)
```

<br/>

### write your first turtle script, like `stamp.turtle.js`

turtle also sniffs out `.turtle.js` scripts and executes them.

in these, you can do anything you want. your turtle script function is provided some handy stuff like the `write_webpage` function.

`stamp.turtle.ts`

```ts
import {turtle_script} from "@benev/turtle"

// import the partial from the previous example
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
			destination: `${x}.html`,
		})
	}))
})
```

<br/>

### you've gotta get into *hash versioning!*
- that's what the above example is doing with that `v` function
- you use `v` on your urls, and `v` will attach that file's hash as a suffix
- so `/style.css` becomes `/style.css?v=c252882f`
- now when you deploy your site, your users won't see old cached css files that break your website -- now the browser cache becomes *version aware!* 🤯

<br/>

### remember, the templates are just async js functions
- so you can import other modules, read and write files, whatever you want
- thanks to top-level await, you could have a module read yaml files or whatever, and then templates can import that data

