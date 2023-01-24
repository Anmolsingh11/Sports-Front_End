import Footer from "../../Footer";
import Navbar from "../../Navbar";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { getEventByID, getExtrasForTeam } from "../../../Api/Events";
import { getPlayerByID } from "../../../Api/Players";
import { useParams } from "react-router-dom";

const EventDetail = () => {
  const [loading, setLoading] = useState(false);
  const [eventDetail, setEventDetail] = useState();
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);
  const [players, setPlayers] = useState([]);
  const [playerA, setPlayerA] = useState();
  const [playerB, setPlayerB] = useState();
  const [teamAExtras, setTeamAExtras] = useState(0);
  const [teamBExtras, setTeamBExtras] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    if (eventDetail && eventDetail.teamName.length > 0) {
      getExtrasForTeam(eventDetail.teamName[0]._id).then((res) => {
        setTeamAExtras(res.data.scores);
      })

      getExtrasForTeam(eventDetail.teamName[1]._id).then((res) => {
        setTeamBExtras(res.data.scores);
      })
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    getEventByID(id)
      .then((res) => {
        setEventDetail(res.data.message[0]);

        // get players for team A
        if (res.data.message[0].eventType === "MultiPlayer") {
          setPlayers(
            res.data.message[0].playerName.map((item) => {
              return { ...item, score: 0 };
            })
          );
        } else if (res.data.message[0].eventType === "Team") {
          res.data.message[0].teamName[0].player.map((item, index) => {
            getPlayerByID(item).then((res) => {
              res.data.message[0]["score"] = 0;
              setTeamA((oldArr) => [...oldArr, res.data.message[0]]);
            });
          });

          // get players for team B
          res.data.message[0].teamName[1].player.map((item, index) => {
            getPlayerByID(item).then((res) => {
              res.data.message[0]["score"] = 0;
              setTeamB((oldArr) => [...oldArr, res.data.message[0]]);
            });
          });
        } else if (res.data.message[0].eventType === "Player") {
          setPlayerA({ ...res.data.message[0].teamName[0], score: 0 });
          setPlayerB({ ...res.data.message[0].teamName[1], score: 0 });
        }

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);


  useEffect(() => {
    if (eventDetail?.eventType === "Team") {
      var pusher = new Pusher("8e1b97efe8b0a23ff691", {
        cluster: "ap2",
      });

      var channel = pusher.subscribe("my-channel");

      channel.bind(id, function (data) {
        console.log("Here is data", JSON.stringify(data));
        console.log("Here is Team", teamA);
        if (data.extras && eventDetail.teamName[0]._id === data.extras.teamId) {
          setTeamAExtras(teamAExtras + 1);
        } else if (data.extras && eventDetail.teamName[1]._id === data.extras.teamId) {
          setTeamBExtras(teamBExtras + 1);
        }
        const updatedPlayers = teamA.map((item) => {
          if (item._id === data.playerId) {
            return { ...item, score: data.score };
          }
          return item;
        });
        if (updatedPlayers[0] != undefined) {
          setTeamA(updatedPlayers);
        } else {
          const updatedPlayers1 = teamB.map((item) => {
            if (item._id === data.playerId) {
              return { ...item, score: data.score };
            }
          });
          if (updatedPlayers1[0] != undefined) {
            setTeamB(updatedPlayers1);
          }
        }
      });
    } else if (eventDetail?.eventType === "MultiPlayer") {

      var pusher = new Pusher("8e1b97efe8b0a23ff691", {
        cluster: "ap2",
      });

      var channel = pusher.subscribe("my-channel");

      channel.bind(id, function (data) {
        console.log("Here is data", JSON.stringify(data));
        const updatedPlayers = players.map((item) => {
          if (item._id === data.playerId) {
            return { ...item, score: data.score };
          }
          return item;
        });
        setPlayers(updatedPlayers);
      });
    } else if (eventDetail?.eventType === "Player") {

      var pusher = new Pusher("8e1b97efe8b0a23ff691", {
        cluster: "ap2",
      });

      var channel = pusher.subscribe("my-channel");

      channel.bind(id, function (data) {
        console.log("Here is data", JSON.stringify(data));
        if (playerA._id == data.playerId) {
          setPlayerA({ ...playerA, score: data.score })
        } else if (playerB._id == data.playerId) {
          setPlayerB({ ...playerB, score: data.score })
        }
      })
    }
  });

  

  // get latest score from db if game is team based
  useEffect(() => {
    if (eventDetail) {
      if (teamA.length > 0 && eventDetail.teamName.length > 0) {
        getExtrasForTeam({ teamId: eventDetail.teamName[0]._id, eventId: id }).then((res) => {
          if (res.data.scores.length > 0) {
            let data = teamA.map(obj1 => {
              const matchingObj = res.data.scores.find(obj2 => obj2.player === obj1._id);
              if (matchingObj) {
                return { ...obj1, score: matchingObj.score };
              }
              return obj1;
            });
            if (data.length > 0) {
              setTeamA(data);
            }
          }
        });
      }

      if (teamB.length > 0 && eventDetail.teamName.length > 1) {
        getExtrasForTeam({ teamId: eventDetail.teamName[1]._id, eventId: id }).then((res) => {
          if (res.data.scores.length > 0) {
            let data = teamB.map(obj1 => {
              const matchingObj = res.data.scores.find(obj2 => obj2.player === obj1._id);
              return { ...obj1, score: matchingObj.score };
            });
            if (data.length > 0) {
              setTeamB(data);
            }
          }
        })
      }
    }
  }, [eventDetail, teamA, teamB]);

  // get latest score from db if game is multiplayer based
  useEffect(() => {
    if (eventDetail) {
      if (players.length > 0 && eventDetail.playerName.length > 0) {
        getExtrasForTeam({ teamId: eventDetail.playerName[0]._id, eventId: id }).then((res) => {
          if (res.data.scores.length > 0) {
            let data = players.map(obj1 => {
              const matchingObj = res.data.scores.find(obj2 => obj2.player === obj1._id);
              if(matchingObj){
                return { ...obj1, score: matchingObj.score };
              }
              return obj1;
            });
            if (data.length > 0) {
              setPlayers(data);
            }
          }
        });
      }
    }
  }, [eventDetail, players]);

  // get latest score from db if game is player based
  useEffect(() => {
    if (eventDetail) {
      if (playerA && eventDetail.teamName.length > 0) {
        getExtrasForTeam({ teamId: eventDetail.teamName[0]._id, eventId: id }).then((res) => {
          if (res.data.scores.length > 0) {
            const matchingObj = res.data.scores.find(obj2 => obj2.player === playerA._id);
            let data = { ...playerA, score: matchingObj.score };
            if (data.length > 0) {
              setPlayerA(data);
            }
          }
        });
      }

      if (playerB && eventDetail.teamName.length > 1) {
        getExtrasForTeam({ teamId: eventDetail.teamName[1]._id, eventId: id }).then((res) => {
          if (res.data.scores.length > 0) {
            const matchingObj = res.data.scores.find(obj2 => obj2.player === playerB._id);
            let data = { ...playerB, score: matchingObj.score };
            if (data.length > 0) {
              setPlayerB(data);
            }
          }
        });
      }
    }
  }, [eventDetail, playerA, playerB]);

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="d-flex justify-content-center mt-5 pt-5">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <>
          {eventDetail ? (
            <>
              <div
                className="card mt-3 mx-3"
                style={{
                  borderRadius: "1.25rem",
                  boxShadow: "0px 0.125rem 0.25rem 0.125rem #eee",
                }}
              >
                <div className="card-body">
                  <div className="container-fluid">
                    {eventDetail.eventType === "MultiPlayer" ? (
                      <div className="row">
                        <div className="col-5 d-flex">
                          <img
                            src={eventDetail?.teamName[0]?.logo}
                            alt="TeamAlogo"
                            width="40px"
                            heigth="40px"
                          />
                          <p
                            style={{ marginLeft: "0.938rem" }}
                            className="pt-2 mb-0"
                          >
                            {eventDetail?.eventName}
                          </p>
                        </div>
                      </div>
                    ) : eventDetail.eventType === "Player" ? (
                      <div className="row">
                        <div className="col-5 d-flex">
                          <img
                            src={eventDetail?.teamName[0]?.logo}
                            alt="Playerlogo"
                            width="40px"
                            heigth="40px"
                          />
                          <p
                            style={{ marginLeft: "0.938rem" }}
                            className="pt-2 mb-0"
                          >
                            {eventDetail?.teamName[0]?.name}
                          </p>
                        </div>
                        <div className="col-2 pt-2">VS</div>
                        <div className="col-5 d-flex float-right">
                          <p
                            style={{ marginRight: "0.938rem" }}
                            className="pt-2 mb-0"
                          >
                            {eventDetail?.teamName[1]?.name}
                          </p>
                          <img
                            src={eventDetail?.teamName[1]?.logo}
                            alt="Playerlogo "
                            width="40px"
                            heigth="40px"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="row">
                        <div className="col-5 d-flex">
                          <img
                            src={eventDetail?.teamName[0]?.logo}
                            alt="TeamAlogo"
                            width="40px"
                            heigth="40px"
                          />
                          <p
                            style={{ marginLeft: "0.938rem" }}
                            className="pt-2 mb-0"
                          >
                            {eventDetail?.teamName[0]?.teamName}
                          </p>
                        </div>
                        <div className="col-5 d-flex float-right">
                          <p
                            style={{ marginRight: "0.938rem" }}
                            className="pt-2 mb-0"
                          >
                            {eventDetail?.teamName[1]?.teamName}
                          </p>
                          <img
                            src={eventDetail?.teamName[1]?.logo}
                            alt="TeamBlogo"
                            width="40px"
                            heigth="40px"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-center mt-2 p-0">
                    {eventDetail.date} || {eventDetail.time} ||{" "}
                    {eventDetail.venue}{" "}
                  </p>
                  <p className="mt-2">
                    Winner:{" "}
                    <span style={{ marginLeft: "2.188rem" }}>
                      {eventDetail.winner.length === 0
                        ? "TBA"
                        : eventDetail.winner}
                    </span>
                  </p>
                </div>
              </div>

              <div
                className="card mt-3 mx-3"
                style={{
                  borderRadius: "1.25rem",
                  boxShadow: "0px 0.125rem 0.25rem 0.125rem #eee",
                }}
              >
                <div className="card-body">
                  {eventDetail.eventType === "Team" && eventDetail.sportName === "Cricket" ?
                    (
                      <>
                        <p>
                          <b>Team A <span style={{ float: 'right' }}>Extras: {teamAExtras}</span></b>
                        </p>
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">S.No</th>
                              <th scope="col">Name</th>
                              <th scope="col">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            {teamA.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.score}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <p>
                          <b>Team B <span style={{ float: 'right' }}>Extras: {teamBExtras}</span></b>
                        </p>
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">S.No</th>
                              <th scope="col">Name</th>
                              <th scope="col">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            {teamB.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.score}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                    ) : eventDetail.eventType === "Team" ? (
                      <>
                        <p>
                          <b>Team A</b>
                        </p>
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">S.No</th>
                              <th scope="col">Name</th>
                              <th scope="col">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            {teamA.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.score}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <p>
                          <b>Team B</b>
                        </p>
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">S.No</th>
                              <th scope="col">Name</th>
                              <th scope="col">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            {teamB.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.score}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                    ) : eventDetail.eventType === "MultiPlayer" ? (
                      <>
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">S.No</th>
                              <th scope="col">Name</th>
                              <th scope="col">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            {players?.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.score}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                    ) : eventDetail.eventType === "Player" ? (
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            <tr>
                              <td>1</td>
                              <td>{playerA.name}</td>
                              <td>{playerA.score}</td>
                            </tr>
                          }
                          {
                            <tr>
                              <td>2</td>
                              <td>{playerB.name}</td>
                              <td>{playerB.score}</td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    ) : (
                      ""
                    )}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </>
      )}
      <Footer />
    </>
  );
};

export default EventDetail;
