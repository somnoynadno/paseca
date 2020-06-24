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

    GetSwarmStatuses() {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/swarm_statuses`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetBeeDiseases() {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/bee_diseases`)
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

    GetRemindersByBeeFarmID(id) {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/reminders_by_bee_farm_id/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetBeeFamiliesByBeeFarmID(id) {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/bee_families_by_bee_farm_id/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetFamilyDiseasesByBeeFarmID(id) {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/family_diseases_by_bee_farm_id/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetHivesByBeeFarmID(id) {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/hives_by_bee_farm_id/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetSwarmsByBeeFarmID(id) {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/swarms_by_bee_farm_id/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetWikiSections() {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/wiki_sections`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetWikiPagesBySectionID(id) {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/wiki_pages_by_section_id/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetWikiPageByID(id) {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/wiki_page/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetSubscriptionTypes() {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/subscription_types`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetHoneyHarvestsGroupByAmount() {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/honey_harvest_stats`)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }

    GetBeeFamilyByID(id) {
        return new Promise((resolve) => {
            HTTP.axios.get(`/lk/bee_family/` + id)
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                HTTP.handleError(error);
            });
        })
    }
}
