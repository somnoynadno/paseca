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

    CreateBeeFarm(name, location, beeFarmSizeID, beeFarmTypeID) {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.post(`/lk/bee_farm`, {
                    name: name,
                    location: location,
                    bee_farm_size_id: parseInt(beeFarmSizeID),
                    bee_farm_type_id: parseInt(beeFarmTypeID)
                })
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    GetBeeFarmTypes() {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/bee_farm_types`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    GetBeeFarmSizes() {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/bee_farm_sizes`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    GetUsersHoneySales() {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/honey_sales`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    GetUsersHoneyHarvests() {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/honey_harvests`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    GetHoneyTypes() {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/honey_types`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    GetUsersBeeFamilies() {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/bee_families`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

}
