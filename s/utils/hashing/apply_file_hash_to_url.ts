
import {compute_hash_for_file} from "./compute_hash_for_file.js"

export async function apply_file_hash_to_url({url, filepath}: {
		url: string,
		filepath: string,
	}) {

	const hash = await compute_hash_for_file(filepath)
	const [url2, fragment] = url.split("#")
	const [url3, query] = url2.split("?")

	const params = new URLSearchParams(query)
	params.set("v", hash.slice(0, 8))

	return `${url3}?${params.toString()}${fragment ?`#${fragment}` :""}`
}

