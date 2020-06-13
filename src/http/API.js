import axios from 'axios'
import {apiAddress} from '../options'
import {HTTP} from "./http-common";

// Базовый класс API. Использует HTTP из http-common.
// Большинство ошибок передаётся в обработчик этой же структуры.
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

    // STATS
    GetStatsForLanding() {
        return new Promise((resolve) => {
            HTTP.axios.get(`/landing/get_stats`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }
}
