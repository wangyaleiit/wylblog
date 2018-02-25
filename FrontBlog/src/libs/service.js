import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: "/api",
  timeout: 10000
});

// request拦截器
//service.interceptors.request.use(config => {
//return config;
//}, error => {
//  console.log(error);
//  Promise.reject(error);
//});

service.interceptors.response.use(response => {
		return response;
	},
	error => {
	    return Promise.reject(error);
	}
);

export default service;
