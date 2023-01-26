import { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import { getAllItenerary } from "../../../Api/Itinerary";
import { getLeaderboardDetails } from "../../../Api/Leaderboard";




const Leaderboard = () => {

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        getLeaderboardDetails().then((res) => {
            setTeams(res.data.message);
        }).catch((err) => { console.log(err) });
    }, [])


    return (
        <>
            <Navbar />
            <div className="card mt-3 mx-3" style={{ borderRadius: '0.938rem', boxShadow: '0px 0.125rem 0.25rem 0.125rem #eee', marginBottom: '30%' }}>
                <div className="card-body">
                    <p className="h5 text-center">Leaderboard</p>
                    <table class="table table-borderless">
                        <thead>
                            <tr className="text-center">
                                <th scope="col">Position</th>
                                <th scope="col">Team Name</th>
                                <th scope="col">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map((item, index) => (
                                <tr key={index} className="text-center">
                                    <td>{index + 1}</td>
                                    <td>{item.teamName}</td>
                                    <td>{item.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer active={"leaderboard"}/>
        </>
    );
}

export default Leaderboard;