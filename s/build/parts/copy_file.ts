
import shell from "shelljs"
import {dirname, resolve} from "path"
import {Path} from "../../utils/path.js"

export async function copy_file(
		source: Path,
		output_directory: string,
		on_file_copied: (source: Path, target: Path) => void = () => {},
	) {

	const relative = output_directory + "/" + source.partial

	const target: Path = {
		directory: output_directory,
		partial: source.partial,
		relative,
		absolute: resolve(relative)
	}

	const is_not_the_same_file = (
		resolve(source.directory) !== resolve(target.directory)
	)

	if (is_not_the_same_file) {
		shell.mkdir("-p", dirname(target.relative))
		shell.cp(source.relative, target.relative)
		on_file_copied(source, target)
	}
}

