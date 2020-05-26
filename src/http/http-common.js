import axios from 'axios'
import {apiAddress} from '../options'

let token = localStorage.getItem('token');

/*
 Базовая структура для запросов axios.
 Содержит заголовки запроса, URL и
 функцию обработки ошибок.
 */
export let HTTP = {
    axios: axios.create({
            baseURL: apiAddress,
            timeout: 4000,
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + token
            }
        }),
    handleError: function (error) {
        console.log(error);
    }
};
