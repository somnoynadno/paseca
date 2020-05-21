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

    GetUsersPollenHarvests() {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/pollen_harvests`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    GetUsersControlHarvests() {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/control_harvests`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    GetBeeBreeds() {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/bee_breeds`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    GetBeeFamilyStatuses() {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/bee_family_statuses`)
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

    GetHiveFrameTypes() {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/hive_frame_types`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    GetHiveFormats() {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/hive_formats`)
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

    CreateHoneyHarvest(amount, date, honeyTypeID, beeFamilyID) {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.post(`/lk/honey_harvest`, {
                amount: parseFloat(amount),
                date: date,
                honey_type_id: parseInt(honeyTypeID),
                bee_family_id: parseInt(beeFamilyID)
            })
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    CreateHoneySale(amount, date, honeyTypeID, beeFarmID, totalPrice) {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.post(`/lk/honey_sale`, {
                amount: parseFloat(amount),
                date: date,
                honey_type_id: parseInt(honeyTypeID),
                bee_farm_id: parseInt(beeFarmID),
                total_price: parseFloat(totalPrice)
            })
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    CreatePollenHarvest(amount, date, beeFarmID) {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.post(`/lk/pollen_harvest`, {
                date: date,
                amount: parseFloat(amount),
                bee_farm_id: parseInt(beeFarmID),
            })
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    CreateControlHarvest(amount, date, beeFamilyID) {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.post(`/lk/control_harvest`, {
                date: date,
                amount: parseFloat(amount),
                bee_family_id: parseInt(beeFamilyID),
            })
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    CreateBeeFamily(beeFarmID, name, queenBeeBornDate,
                    lastInspectionDate, beeBreedId,
                    beeFamilyStatusID, parent1ID,
                    parent2ID, isControl) {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.post(`/lk/bee_family`, {
                bee_farm_id: parseInt(beeFarmID),
                bee_breed_id: parseInt(beeBreedId),
                name: name,
                queen_bee_born_date: queenBeeBornDate,
                last_inspection_date: lastInspectionDate,
                bee_family_status_id: parseInt(beeFamilyStatusID),
                parent1_id: parseInt(parent1ID),
                parent2_id: parseInt(parent2ID),
                is_control: isControl
            })
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                    console.log(error);
            });
        })
    }

    CreateReminder(beeFarmID, title, text, date) {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.post(`/lk/reminder`, {
                bee_farm_id: parseInt(beeFarmID),
                date: date,
                title: title,
                text: text
            })
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

    CreateHive(beeFarmID, name, hiveFormatID, hiveFrameTypeID) {
        this.CheckToken();
        return new Promise((resolve) => {
            HTTP.axios.post(`/lk/hive`, {
                name: name,
                bee_farm_id: parseInt(beeFarmID),
                hive_format_id: parseInt(hiveFormatID),
                hive_frame_type_id: parseInt(hiveFrameTypeID)
            })
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                console.log(error);
            });
        })
    }

}
