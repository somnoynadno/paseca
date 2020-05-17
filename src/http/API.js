import axios from 'axios'
import {HTTP} from './http-common';
import {apiAddress} from '../options'


export class API {
    CheckToken() {
        HTTP.InitToken();
    }

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

    GetLastNews() {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/news`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                    console.log(error);
            });
        })
    }

    GetUserInfo() {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/user`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    GetBeeFarms() {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/bee_farms`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    GetBeeFarmByID(id) {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/bee_farm/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }
}
