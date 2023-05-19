
import {glob} from "glob"
import {join, resolve} from "path"
import {debase_path} from "../build/parts/debase_path.js"

export async function find_files(
		directories: string[],
		excludes: string[],
		pattern: string,
	) {

	return (await Promise.all(
		directories.map(async directory => {
			const fullpattern = directory + "/" + pattern
			const ignore = excludes.map(exclude => join(directory, exclude))
			const full_paths = await glob(fullpattern, {ignore, nodir: true})
			return full_paths.map(relative => ({
				relative,
				directory,
				absolute: resolve(relative),
				partial: debase_path(directory, relative),
			}))
		})
	)).flat()
}

