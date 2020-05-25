import {API} from "./API";
import {HTTP} from "./http-common";

// API file to send DELETE requests
export class DELETE_API extends API {
    DeleteBeeBreedByID(id) {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.delete(`/lk/bee_breed/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    DeleteHiveFormatByID(id) {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.delete(`/lk/hive_format/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    DeleteHiveFrameTypeByID(id) {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.delete(`/lk/hive_frame_type/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    DeleteHoneyTypeByID(id) {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.delete(`/lk/honey_type/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    DeleteHiveByID(id) {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.delete(`/lk/hive/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    DeleteBeeFarmByID(id) {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.delete(`/lk/bee_farm/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    DeleteBeeFamilyByID(id) {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.delete(`/lk/bee_family/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    DeleteReminderByID(id) {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.delete(`/lk/reminder/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    DeleteHoneySaleByID(id) {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.delete(`/lk/honey_sale/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    DeleteHoneyHarvestByID(id) {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.delete(`/lk/honey_harvest/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    DeleteControlHarvestByID(id) {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.delete(`/lk/control_harvest/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    DeletePollenHarvestByID(id) {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.delete(`/lk/pollen_harvest/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }
}
