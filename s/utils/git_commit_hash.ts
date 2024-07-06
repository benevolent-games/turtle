
import {$} from "zx"

export async function git_commit_hash() {
	return (await $`git rev-parse HEAD`.quiet()).stdout.trim()
}

