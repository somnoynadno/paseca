import {API} from "./API";
import {HTTP} from "./http-common";


// API file to send PUT requests
export class PUT_API extends API {
    EditBeeFarm(id, name, location, beeFarmTypeID) {
        return new Promise((resolve) => {
            HTTP.axios.put(`/lk/bee_farm/` + id, {
                name: name,
                location: location,
                bee_farm_type_id: parseInt(beeFarmTypeID)
            })
                .then(response => {
                    resolve(response.data);
                }).catch(function (error) {
                    HTTP.handleError(error);
            });
        })
    }
}
