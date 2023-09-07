/* eslint-disable no-undef */
import Axios from 'axios';


const request = Axios.create({
	baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
});

request.interceptors.request.use((oldConfig:any) => {
	
	return {
		...oldConfig,
		headers: {
			"Content-type": "application/json",
			
		},

	};
});

export { request };
