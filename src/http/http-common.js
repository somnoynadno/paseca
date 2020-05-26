import axios from 'axios'
import {apiAddress} from '../options'

let token = localStorage.getItem('token');

export let HTTP = {
    axios: axios.create({
            baseURL: apiAddress,
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + token
            }
        }),
    handleError: function (error) {
        console.log(error);
    }
};
