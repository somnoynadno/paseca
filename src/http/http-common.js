import axios from 'axios'
import {apiAddress} from '../options'

export let HTTP = {
    axios: null,
    token: localStorage.getItem('token'),
    Init: function(){
        this.axios = axios.create({
            baseURL: apiAddress,
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + this.token
            }
        });
    },
    InitToken: function () {
        this.token = localStorage.getItem('token');
        this.Init();
    }
};
