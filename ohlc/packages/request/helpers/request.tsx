/* eslint-disable no-undef */
import Axios from 'axios';


const request = Axios.create({
	baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
});

request.interceptors.request.use((oldConfig:any) => {
	
	return {
		...oldConfig,
		headers: {
			// 'cept': 'application/json',
			// "access-control-allow-origin" : "https://trading.bitfinex.com",
			"Content-type": "application/json",
			
		},

	};
});

export { request };
