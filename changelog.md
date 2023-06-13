
# turtle changelog

### v0.3.1

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

