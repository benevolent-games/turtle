
import {$} from "zx"
import {dirname} from "path"
import {writeFile, readFile} from "fs/promises"

const encoding = "utf-8"

export async function read_file(path: string) {
	return readFile(path, encoding)
}

export async function write_file(path: string, text: string) {
	await $`mkdir -p "${dirname(path)}"`
	return writeFile(path, text.toString(), encoding)
}

