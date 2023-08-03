
# turtle changelog

- ! execute turtle scripts *before* the html build stage
  - this allows you to write files that can be hash-versioned in your templates
- add `read_file` function
- add `Array.prototype.at` polyfill to bundle

### v0.4.0 (2023-06-20)

- ! replace `startup_scripts_with_debug_mode` with the new `startup_scripts_with_dev_mode`
  - if the website url location host starts with `localhost` or `192.`, dev mode is enabled
  - `?dev=false` force-disables dev mode (loads the bundle)
  - `?dev=true` force-enables dev mode (loads es modules)
  - the new routine adds the prefix `[dev]` to the document title, to make it obvious when you're in dev mode

### v0.3.2 (2023-06-13)

- add common boilerplate scripts and patterns

### v0.3.1 (2023-06-13)

- export 'PathRouter' from "@benev/turtle"

### v0.3.0 (2023-06-11)

- ! rename `HtmlTemplate` to `Html`
- ! rename `webpage` to `template`
- ! overhaul replaces template basics `v` and `base` with new `path` system
  - now instead of `v("/style.css")` you want to do `path(import.meta.url).version.root("style.css")`
  - see more detail on `path` in the readme
- ! `HashVersionerError` replaced by `HashingError`

### v0.2.0 (2023-06-10)

- ! rename cli arg `excludes` to `exclude`
- `script_directory` is now provided to turtle scripts
- reworked `base` calculation
- errors now print stack traces

### v0.1.2

