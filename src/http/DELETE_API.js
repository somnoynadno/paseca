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

}
