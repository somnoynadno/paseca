import axios from 'axios'
import {HTTP} from './http-common';
import {apiAddress} from '../options'


export class API {
    CheckToken() {
        HTTP.InitToken();
    }

    // AUTH
    LoginUser(username, password) {
        return new Promise((resolve) => {
            axios.post(apiAddress + `/login`, {
                username: username,
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

    GetNews() {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.get(`/news?_end=10&_order=DESC&_sort=id&_start=0`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                    console.log(error);
            });
        })
    }
}
