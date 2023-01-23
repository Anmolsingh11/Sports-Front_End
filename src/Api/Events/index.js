import axios from "axios";

export const getEventsBySportName = (reqBody) =>{
    return axios.post(`${process.env.REACT_APP_BASE_URL}/event/get-event-by-sports`,reqBody);
}


export const getEventByID = (ID) =>{
    return axios.get(`${process.env.REACT_APP_BASE_URL}/event/get-event-by-id/${ID}`);
}

export const getExtrasForTeam = (reqBody) => {
    return axios.post(`${process.env.REACT_APP_BASE_URL}/event/get-extras-by-event-and-team`,reqBody);
}

export const getCurrentScoreByEvent = (reqBody) => {
    return axios.post(`${process.env.REACT_APP_BASE_URL}/event/get-score-by-event`,reqBody)
}