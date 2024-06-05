
import {globby} from "globby"
import {join, resolve} from "path"
import {debase_path} from "../build/parts/debase_path.js"

export async function find_files(
		directories: string[],
		exclude: string[],
		pattern: string,
	) {

	return (await Promise.all(
		directories.map(async directory => {
			const fullpattern = directory + "/" + pattern
			const ignore = exclude.map(exclude => join(directory, exclude))
			const full_paths = await globby(fullpattern, {ignore})
			return full_paths.map(relative => ({
				relative,
				directory,
				absolute: resolve(relative),
				partial: debase_path(directory, relative),
			}))
		})
	)).flat()
}

