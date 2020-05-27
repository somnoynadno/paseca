import {HTTP} from "./http-common";
import {API} from "./API";

// API file to send GET requests
export class GET_API extends API {
    GetLastNews() {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/news`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetUserInfo() {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/user`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetBeeFarms() {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/bee_farms`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetBeeFarmByID(id) {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/bee_farm/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetBeeFarmTypes() {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/bee_farm_types`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetBeeFarmSizes() {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/bee_farm_sizes`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetUsersHoneySales(sort, order, start, end) {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/honey_sales?_sort=${sort}&_order=${order}&_start=${start}&_end=${end}`)
                .then(response =>{
                    response.data.count = parseInt(response.headers["x-total-count"]);
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetUsersPollenHarvests(sort, order, start, end) {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/pollen_harvests?_sort=${sort}&_order=${order}&_start=${start}&_end=${end}`)
                .then(response =>{
                    response.data.count = parseInt(response.headers["x-total-count"]);
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetUsersControlHarvests(sort, order, start, end) {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/control_harvests?_sort=${sort}&_order=${order}&_start=${start}&_end=${end}`)
                .then(response =>{
                    response.data.count = parseInt(response.headers["x-total-count"]);
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetBeeBreeds() {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/bee_breeds`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetBeeFamilyStatuses() {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/bee_family_statuses`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetUsersHoneyHarvests(sort, order, start, end) {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/honey_harvests?_sort=${sort}&_order=${order}&_start=${start}&_end=${end}`)
                .then(response =>{
                    response.data.count = parseInt(response.headers["x-total-count"]);
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetHoneyTypes() {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/honey_types`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetHiveFrameTypes() {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/hive_frame_types`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetHiveFormats() {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/hive_formats`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetUsersBeeFamilies() {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/bee_families`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetUsersBeeFamiliesWithoutHives() {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/bee_families_without_hives`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetUsersFreeHives() {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/hives`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }
}
