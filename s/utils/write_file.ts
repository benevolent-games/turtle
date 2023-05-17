
import {writeFile} from "fs/promises"

const encoding = "utf-8"

export async function write_file(path: string, text: string) {
	return writeFile(path, text.toString(), encoding)
}

