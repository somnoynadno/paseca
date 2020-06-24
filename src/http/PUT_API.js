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

    EditBeeFamily(id, name, queenBeeBornDate,
                  lastInspectionDate, beeBreedId,
                  beeFamilyStatusID, isControl) {
        return new Promise((resolve) => {
            HTTP.axios.put(`/lk/bee_family/` + id, {
                id: parseInt(id),
                bee_breed_id: parseInt(beeBreedId),
                name: name,
                queen_bee_born_date: queenBeeBornDate,
                last_inspection_date: lastInspectionDate,
                bee_family_status_id: parseInt(beeFamilyStatusID),
                is_control: isControl
            })
                .then(response =>{
                    resolve(response.data);
                }).catch(function(error) {
                    HTTP.handleError(error);
            });
        })
    }
}
