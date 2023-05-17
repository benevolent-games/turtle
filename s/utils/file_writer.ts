
import {join, dirname} from "path"
import {writeFile, mkdir} from "fs/promises"

const encoding = "utf-8"

export class FileWriter {
	#root: string

	constructor(root: string) {
		this.#root = root
	}

	actual_path(path: string) {
		return join(this.#root, path)
	}

	async write(path: string, text: string) {
		const path2 = this.actual_path(path)
		await mkdir(dirname(path2), {recursive: true})
		return writeFile(path2, text.toString(), encoding)
	}
}

