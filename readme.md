
![](./assets/turtle-title.webp)

# 🐢 `@benev/turtle`

📦 turtle is an npm package: [`@benev/turtle`](https://www.npmjs.com/package/@benev/turtle)  
🪄 turtle is a one-line static-site-generator  
📜️ turtle scripts standardize our ts app builds  
⚙️ turtle patterns optimize our websites' prod/dev modes  
🧐 turtle is typescript-first, but you can use plain javascript  
❤️ turtle is free and open source  

<br/>
<br/>

# 🪄 turtle static-site-generator

- turtle's original and primary purpose is to be a static site generator
- `turtle` a one-line command that sniffs out your `.html.js` files and renders them into html files
- turtle provides your templates a `path` utility that has *hash versioning* capabilities, to fix browser-caching issues with your css on deployments
- turtle also copies over css files and such
- turtle also executes `.turtle.js` scripts

<br/>

### generate a website with turtle's cli

```sh
npx @benev/turtle --in="s:x" --out="x" --exclude="**/*.partial.html.js" --verbose="true"
```

![image: turtle example output](https://i.imgur.com/IpAi0rF.png)

note: turtle can accept multiple input directories.  
that's because you'll likely keep your `.css` files alongside your typescript sources, whereas your `.html.js` javascript will be built into your typescript's output directory.

<br/>

### ask turtle for help

```sh
npx @benev/turtle --help
```

![image: turtle help page](https://i.imgur.com/Zpf4Iqk.png)

<br/>

### write your first webpage template

turtle will sniff out your `.html.js` files as inputs, then output matching `.html` files.

`index.html.js`

```js
import {template, html} from "@benev/turtle"

export default template(async({path}) => html`
  <!doctype html>
  <html>
    <head>
      <title>@benev/turtle</title>
      <link
        rel="stylesheet"
        href="${path(import.meta.url).version.root('style.css')}"
        />
    </head>
    <body>
      <h1>@benev/turtle</h1>
    </body>
  </html>
`)
```

<br/>

### you can write template partials

notice the `x` parameter, which is the example "context" for this template. it doesn't need to be a number, it could be anything.

`page.partial.ts`

```ts
import {template, html} from "@benev/turtle"

export default template(async({path}, x: number) => html`
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8"/>
      <title>@benev/turtle - stamp test</title>
      <link
        rel="stylesheet"
        href="${path(import.meta.url).version.root('style.css')}"
        />
    </head>
    <body>
      <h1>@benev/turtle - stamp test</h1>
      <p>${x}</p>
    </body>
  </html>
`)
```

<br/>

### write your first turtle script

turtle also sniffs out `.turtle.js` scripts and executes them.

in these, you can do anything you want. your turtle script function is provided some handy stuff like the `write_webpage` function.

`stamp.turtle.ts`

```ts
import {turtle_script} from "@benev/turtle"

// import the partial from the previous example
import page from "./page.partial.js"

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
      context: x,

      // specify the destination relative
      // to this build script
      destination: `${x}.html`,
    })
  }))
})
```

<br/>

### you've gotta get into *file path hash versioning!*
- some of the above examples are using this `path` function
- if you use `.version` then it will attach the file's hash as a suffix
- so `/style.css` becomes `/style.css?v=c252882f`
- now when you deploy your site, your users won't see old cached css files that break your website -- now the browser cache becomes *version aware!* 🤯

<br/>

### use `path` in your templates

turtle gives you a `path` utility that allows you to link to file from different reference points. it can also do *file path hash versioning* for you.

to understand it, consider a hypothetical file structure like this:

```
s/ <-- (source directory)
  favicon.png
  cool/
    awesome.html.ts <-- (your turtle template)
    style.css
```
also, we'll assume you've set `const {url} = import.meta`

- `path(url).root("favicon.png")`  
  use *root* to reference files relative to the website root.  
  result: `../favicon.png`

- `path(url).local("style.css")`  
  use *local* to reference files relative to the current template module.  
  result: `style.css`

- `path(url).dest("rofl.jpg")`
  use *dest* for special cases, to reference files relative to the *destination html file* that it output.  
  this is for custom turtle script builds, where the destination html file output will be written into a different directory structure than the location of the current template module.  

okay, this might make more sense when you consider file path versioning.

simply add `.version` to the above commands, and turtle will attach a hash query param suffix, which will magically fix all your browser caching problems:

- `path(url).version.root("favicon.png")`  
  result: `../favicon.png?v=f6dd3bc1`

- `path(url).version.local("style.css")`  
  result: `style.css?v=ce5f3acd`

- `path(url).version.dest("rofl.jpg")`  

<br/>

### remember, the templates are just async js functions
- so you can import other modules, read and write files, whatever you want
- thanks to top-level await, you could have a module read yaml files or whatever, and then templates can import that data

<br/>

### be sure to escape globs

- if you provide a glob to a flag like `--exclude="partials/**/*"` -- be sure to use double quotes so that your shell doesn't expand the glob -- the double quotes tells your shell to pass the literal glob to turtle, which will then process the glob properly (if you let the shell expand the glob, it won't work)

<br/>
<br/>

# 📜️ turtle scripts

we use turtle scripts to standardize the whole build routine for our typescript apps across our many projects, to reduce repetitive boilerplate and centralize its maintenance.

with turtle installed, you can run these scripts with like `npx turtle-standard` at the command line, or in an npm package.json script, just `turtle-standard` will work as a one-line command.

primary scripts:

- **`turtle-install`**  
  run this once to install the dependencies for these scripts into your current project.

- **`turtle-standard`**  
  run a standard typescript build, rollup bundle, and run the turtle static site generator.

- **`turtle-standard-watch`**  
  run the http-server, and watch routine for the standard build.

there are more [scripts/](./scripts/) but i don't feel like documenting them all.

<br/>
<br/>

# ⚙️ turtle patterns

these are just functions for your turtle html templates that make life easier.

- `easypage` returns takes care of the boilerplate of an ordinary html page, it takes care of the meta charset and the meta viewport stuff.

- `startup_scripts_with_dev_mode` will load your app via the rollup bundle in production, but in dev mode, it will load your app as individual es modules.
  - you can add `?dev=true` to your website's url to enable dev mode
  - if you are browsing your website from a `localhost` address, dev mode will be enabled by default
  - you can force disable dev mode with `?dev=false`
  - the document title will be prefixed with `[dev]` when dev mode is enabled, to make it obvious

