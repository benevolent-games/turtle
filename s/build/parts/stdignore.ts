
export function stdignore(ignore: string[]) {
	return [...ignore, "**/node_modules", "**/.*/"]
}

