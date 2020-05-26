import axios from 'axios'
import {HTTP} from './http-common';
import {apiAddress} from '../options'

// base API class
// TODO: add better error handler
export class API {
    // AUTH
    LoginUser(email, password) {
        return new Promise((resolve) => {
            axios.post(apiAddress + `/auth/login`, {
                email: email,
                password: password
            })
            .then(response => {
                resolve(response.data);
            }).catch(error => {
                console.log(error);
                resolve(error);
            });
        })
    }
}
