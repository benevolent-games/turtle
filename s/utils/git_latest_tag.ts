
import {$} from "zx"

export async function git_latest_tag() {
	return (await $`git describe --tags --abbrev=0`.quiet()).stdout.trim()
}

