import axios from "axios";

export const getPlayerByID = async(ID) =>{
    return await axios.get(`${process.env.REACT_APP_BASE_URL}/player/get-player-by-id/${ID}`);
}