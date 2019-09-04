import axios from 'axios';

// axios.interceptors.response.use( (response) => {
//     // const token = localStorage.getItem('access_token');
//     // config.headers.Authorization = token;
//     // console.log(token)
//     return response;
// }, (error) => {
//     switch(error.response.status) {
//         case 401:
//             console.log('invalido!!')
//             break;
//     }
//     return Promise.reject(error);
// });

const instance = axios.create({
    baseURL: 'http://localhost:5000'
});

instance.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');

instance.interceptors.request.use(request => {
    //console.log(request);
    // Edit request config
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    //console.log(response);
    // Edit response config
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

export default instance;