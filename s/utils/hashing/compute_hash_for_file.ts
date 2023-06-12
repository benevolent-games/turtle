
import {createHash} from "crypto"
import {readFile} from "fs/promises"
import {HashingError} from "../../errors/hashing_error.js"

export async function compute_hash_for_file(path: string) {
	try {
		const file = await readFile(path, "utf-8")
		const hasher = createHash("sha256")
		hasher.update(file)
		return hasher.digest("hex")
	}
	catch (error) {
		throw new HashingError(`failed to hash file "${path}"`)
	}
}

