import {API} from "./API";
import {HTTP} from "./http-common";

// API file to send DELETE requests
export class DELETE_API extends API {
    DeleteBeeBreedByID(id) {
        return new Promise((resolve) => {
            HTTP.axios.delete(`/lk/bee_breed/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    DeleteHiveFormatByID(id) {
        return new Promise((resolve) => {
            HTTP.axios.delete(`/lk/hive_format/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    DeleteHiveFrameTypeByID(id) {
        return new Promise((resolve) => {
            HTTP.axios.delete(`/lk/hive_frame_type/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    DeleteHoneyTypeByID(id) {
        return new Promise((resolve) => {
            HTTP.axios.delete(`/lk/honey_type/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    DeleteHiveByID(id) {
        return new Promise((resolve) => {
            HTTP.axios.delete(`/lk/hive/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    DeleteBeeFarmByID(id) {
        return new Promise((resolve) => {
            HTTP.axios.delete(`/lk/bee_farm/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    DeleteBeeFamilyByID(id) {
        return new Promise((resolve) => {
            HTTP.axios.delete(`/lk/bee_family/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    DeleteReminderByID(id) {
        return new Promise((resolve) => {
            HTTP.axios.delete(`/lk/reminder/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    DeleteSwarmByID(id) {
        return new Promise((resolve) => {
            HTTP.axios.delete(`/lk/swarm/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    DeleteFamilyDiseaseByID(id) {
        return new Promise((resolve) => {
            HTTP.axios.delete(`/lk/family_disease/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    DeleteHoneySaleByID(id) {
        return new Promise((resolve) => {
            HTTP.axios.delete(`/lk/honey_sale/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    DeleteHoneyHarvestByID(id) {
        return new Promise((resolve) => {
            HTTP.axios.delete(`/lk/honey_harvest/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    DeleteControlHarvestByID(id) {
        return new Promise((resolve) => {
            HTTP.axios.delete(`/lk/control_harvest/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    DeletePollenHarvestByID(id) {
        return new Promise((resolve) => {
            HTTP.axios.delete(`/lk/pollen_harvest/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }
}
