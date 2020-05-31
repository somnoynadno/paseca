import {API} from "./API";
import {HTTP} from "./http-common";


// API file to send POST requests
export class POST_API extends API {
    CreateBeeFarm(name, location, beeFarmSizeID, beeFarmTypeID) {
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
                HTTP.handleError(error);
            });
        })
    }

    CreateHoneyHarvest(amount, date, honeyTypeID, beeFamilyID) {
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
                HTTP.handleError(error);
            });
        })
    }

    CreateHoneySale(amount, date, honeyTypeID, beeFarmID, totalPrice) {
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
                HTTP.handleError(error);
            });
        })
    }

    CreatePollenHarvest(amount, date, beeFarmID) {
        return new Promise((resolve) => {
            HTTP.axios.post(`/lk/pollen_harvest`, {
                date: date,
                amount: parseFloat(amount),
                bee_farm_id: parseInt(beeFarmID),
            })
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    CreateControlHarvest(amount, date, beeFamilyID) {
        return new Promise((resolve) => {
            HTTP.axios.post(`/lk/control_harvest`, {
                date: date,
                amount: parseFloat(amount),
                bee_family_id: parseInt(beeFamilyID),
            })
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    CreateBeeFamily(beeFarmID, name, queenBeeBornDate,
                    lastInspectionDate, beeBreedId,
                    beeFamilyStatusID, parent1ID,
                    parent2ID, isControl) {
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
                HTTP.handleError(error);
            });
        })
    }

    CreateReminder(beeFarmID, title, text, date) {
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
                HTTP.handleError(error);
            });
        })
    }

    CreateHive(beeFarmID, name, hiveFormatID, hiveFrameTypeID) {
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
                HTTP.handleError(error);
            });
        })
    }

    SetHiveCoords(hiveID, coordX, coordY, beeFarmID) {
        return new Promise((resolve) => {
            HTTP.axios.post(`/lk/hive/set_coords`, {
                hive_id: parseInt(hiveID),
                coord_x: parseInt(coordX),
                coord_y: parseInt(coordY),
                bee_farm_id: parseInt(beeFarmID)
            })
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    SetHiveBeeFamily(hiveID, beeFamilyID) {
        return new Promise((resolve) => {
            HTTP.axios.post(`/lk/hive/set_hive_bee_family`, {
                hive_id: parseInt(hiveID),
                bee_family_id: parseInt(beeFamilyID),
            })
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    CheckReminderByID(id) {
        return new Promise((resolve) => {
            HTTP.axios.post(`/lk/check_reminder/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    CreateCustomBeeBreed(name, description) {
        return new Promise((resolve) => {
            HTTP.axios.post(`/lk/bee_breed`, {
                name: name,
                description: description
            })
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    CreateCustomBeeDisease(name, description) {
        return new Promise((resolve) => {
            HTTP.axios.post(`/lk/bee_disease`, {
                name: name,
                description: description
            })
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    CreateCustomHiveFormat(name, size) {
        return new Promise((resolve) => {
            HTTP.axios.post(`/lk/hive_format`, {
                name: name,
                size: parseInt(size)
            })
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    CreateCustomHiveFrameType(name) {
        return new Promise((resolve) => {
            HTTP.axios.post(`/lk/hive_frame_type`, {
                name: name,
            })
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    CreateCustomHoneyType(name, description, basePrice) {
        return new Promise((resolve) => {
            HTTP.axios.post(`/lk/honey_type`, {
                name: name,
                description: description,
                base_price: parseInt(basePrice)
            })
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }
}
