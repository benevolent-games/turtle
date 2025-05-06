
import {createHash} from "crypto"
import {readFile} from "fs/promises"

export async function compute_hash_for_file(path: string) {
	try {
		const file = await readFile(path)
		const hasher = createHash("sha256")
		hasher.update(file)
		return hasher.digest("hex")
	}
	catch (error) {
		console.error(`turtle failed while attempting to hash "${path}"`)
		throw error
	}
}

