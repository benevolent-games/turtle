
export function escape_regex(subject: string) {
	return subject.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
}
