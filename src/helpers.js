export const toSuccess = res => {
	if (res.status === 'error') return toError(res)
	return res
}

export const toError = error => {

	return error
}