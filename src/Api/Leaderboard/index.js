import axios from "axios"

export const getLeaderboardDetails = () =>{
    return axios.get(`${process.env.REACT_APP_BASE_URL}/leaderboard/get-leaderboard`);
}