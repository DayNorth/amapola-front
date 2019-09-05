import decode from 'jwt-decode';
import Axios from 'axios';

export default class AuthenticationService {

    constructor(domain) {
        this.domain = domain || 'http://127.0.0.1:5001';
        this.login = this.login.bind(this);
        this.setToken = this.setToken.bind(this);
    }

    async login(username, password) {
        const headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "http://127.0.0.1:3000/#/",
        }

        let self = this;

        if (this.loggedIn()) {
            console.log('esta loggeado')
            headers['Authorization'] = 'Bearer ' + this.getToken();
        }

        return await Axios.post(`${this.domain}/login`, {
            username: username,
            password: password
        })
        .then(function(response){
            console.log(response)
            self.setToken(response.data)
            return Promise.resolve(response);
        })
        .catch(function(error){
            return Promise.reject(error)
        })
    }

    setToken(idToken) {
        localStorage.setItem('access_token', idToken.access_token)
        localStorage.setItem('refresh_token', idToken.refresh_token)
    }

    getToken() {
        return localStorage.getItem('access_token');
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000 ) {
                return true;
            } else {
                return false;
            }
        }
        catch (error) {
            return false;
        }
    }

    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token)
    }
    
    async logout() {
        // const headers = {
        //     'Authorization': 'Bearer ' + this.getToken()
        // }

        // console.log(headers)
        // await Axios.post(`${this.domain}/logout`, null, {"headers": headers})
        // .then(res => {
        //     console.log(res)
        // })
        // .catch(err => {
        //     console.log(err)
        // })

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }
}