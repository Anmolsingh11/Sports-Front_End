import axios from "axios";

export const getAllItenerary = (date) =>{
    return axios.post(`${process.env.REACT_APP_BASE_URL}/event/get-itineraries-by-date`,{date});
}