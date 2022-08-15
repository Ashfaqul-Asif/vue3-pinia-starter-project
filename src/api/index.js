
const endpoint = {
	Auth: {
		login: (body) => api.get('/Account/login', body),
		register: (body) => api.post('/Account/register', body),
		refreshToken: (body) => api.post('/Account/refreshtoken', body),
	}
}


export default endpoint
