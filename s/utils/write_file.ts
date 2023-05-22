
import shell from "shelljs"
import {dirname} from "path"
import {writeFile} from "fs/promises"

const encoding = "utf-8"

export async function write_file(path: string, text: string) {
	shell.mkdir("-p", dirname(path))
	return writeFile(path, text.toString(), encoding)
}

