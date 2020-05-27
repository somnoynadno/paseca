import axios from 'axios'
import {apiAddress} from '../options'

let token = localStorage.getItem('token');
let TIMEOUT = 5000;

/*
 Базовая структура для запросов axios.
 Содержит заголовки запроса, URL и
 функцию обработки ошибок.
 */
export let HTTP = {
    axios: axios.create({
            baseURL: apiAddress,
            timeout: TIMEOUT,
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + token
            }
        }),
    handleError: function (error) {
        console.log(error);
        if (error.toString() === `Error: timeout of ${TIMEOUT}ms exceeded`) {
            window.location.href = '/error?code=408';
        }
        else if (error.response) {
            let message = error.response.data["message"];
            console.log(message); // for developer
            let status = error.response.status;
            if (status === 401) {
                window.location.href = '/login';
            } else {
                window.location.href = '/error?code=' + status;
            }
        }
    }
};
