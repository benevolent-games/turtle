
# 🐢 `@benev/turtle`

*slow and steady static site generator*

- turtle is a one-line command that generates a website
- you write html templates in plain javascript
- templates are just async functions, so you can do *anything*
- you can kind of imagine it like some kind of static javascript "php"
- turtle also copies other files like css and whatnot

<br/>

## turtle turtorial

<br/>

### run turtle to generate a website

```sh
npx @benev/turtle --in="s/demo:x/demo" --out="x/demo" --verbose="true"
```

![image: turtle example output](https://i.imgur.com/IpAi0rF.png)

<br/>

### ask turtle for help

```sh
npx @benev/turtle +help
```

![image: turtle help page](https://i.imgur.com/zT8mtFO.png)

<br/>

### write your first webpage template, like `index.html.js`

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

### you've gotta get into *hash versioning!*
- that's what the above example is doing with that `v` function
- you use `v` on your urls, and `v` will attach that file's hash as a suffix
- so `/style.css` becomes `/style.css?v=c252882f`
- now when you deploy your site, your users won't see old cached css files that break your website -- now the browser cache becomes *version aware!* 🤯

<br/>

### remember, the templates are just async js functions
- so you can import other modules, read and write files, whatever you want
- thanks to top-level await, you could have a module read yaml files or whatever, and then templates can import that data

<br/>

### i'm thinking of adding more turtle functionality later..
- some smart way to add custom build scripts that can, like, build a whole directory of yamls or markdowns or whatever, and generate a ton of pages (as opposed to being limited to just one `.html.js` per generated page)

