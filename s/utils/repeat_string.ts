
export function repeat_string(n: number, s: string) {
	let result = ""

	for (let i = 0; i < n; i++)
		result += s

	return result
}

