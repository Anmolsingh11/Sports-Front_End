import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventsBySportName } from "../../../Api/Events";
import Footer from "../../Footer";
import Navbar from "../../Navbar";

const Events = () => {
    const navigate = useNavigate();
    const { sportName } = useParams();
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([])

    useEffect(() => {
        setLoading(true);
        getEventsBySportName({ sportName }).then((res) => {
            setEvents(res.data.events);
            setLoading(false);
            console.log(res)
        }).catch((err) => {
            console.log(err);
        })
    }, []);
    return (
        <>
            <Navbar />
            <div className="mx-3">
                <div className="mt-3">
                    {/* <p className="font-weight-500">Live Events</p> */}
                    {loading
                        ?
                        <div className="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="sr-only"></span>
                            </div>
                        </div>
                        :
                        events?.length > 0 ? events.map((item, index) => (
                            <div className="card mx-3 mt-3" key={index} onClick={() => navigate(`/event-detail/${item._id}`)} style={{ borderRadius: '20px', boxShadow: '0px 2px 4px 2px #eee' }}>
                                <div className="card-body">
                                    <div className="container-fluid">
                                    {item.eventType === "MultiPlayer"
                                    ?
                                    <div className="row">
                                        <div className="col-5 d-flex">
                                            <img src={item?.teamName[0]?.logo} alt="TeamAlogo" width="40px" heigth="40px" />
                                            <p style={{ marginLeft: '15px' }} className="pt-2 mb-0">{item?.teamName[0]?.name}</p>
                                        </div>
                                        <div className="col-2 pt-2">VS</div>
                                        <div className="col-5 d-flex float-right">
                                            <p style={{ marginRight: '15px' }} className="pt-2 mb-0">{item?.teamName[1]?.name}</p>
                                            <img src={item?.teamName[1]?.logo} alt="TeamBlogo" width="40px" heigth="40px" />
                                        </div>
                                    </div>
                                    :
                                    item.eventType === "Team"
                                    ?
                                    <div className="row">
                                    <div className="col-5 d-flex">
                                        <img src={item?.teamName[0]?.logo} alt="Playerlogo" width="40px" heigth="40px" />
                                        <p style={{ marginLeft: '15px' }} className="pt-2 mb-0">{item?.teamName[0]?.teamName}</p>
                                    </div>
                                    <div className="col-2 pt-2">VS</div>
                                    <div className="col-5 d-flex float-right">
                                        <p style={{ marginRight: '15px' }} className="pt-2 mb-0">{item?.teamName[1]?.teamName}</p>
                                        <img src={item?.teamName[1]?.logo} alt="Playerlogo " width="40px" heigth="40px" />
                                    </div>
                                </div>
                                :
                                item.eventType === "Player"
                                    ?
                                    <div className="row">
                                    <div className="col-5 d-flex">
                                        <img src={item?.teamName[0]?.logo} alt="Playerlogo" width="40px" heigth="40px" />
                                        <p style={{ marginLeft: '15px' }} className="pt-2 mb-0">{item?.teamName[0]?.name}</p>
                                    </div>
                                    <div className="col-2 pt-2">VS</div>
                                    <div className="col-5 d-flex float-right">
                                        <p style={{ marginRight: '15px' }} className="pt-2 mb-0">{item?.teamName[1]?.name }</p>
                                        <img src={item?.teamName[1]?.logo} alt="Playerlogo " width="40px" heigth="40px" />
                                    </div>
                                </div>
                                :
                                ""}
                                    </div>
                                    <p className="text-center m-0 p-0">{item.date} || {item.time} || {item.venue} </p>
                                </div>
                            </div>
                        )) : <h3 className="text-center mt-4 pt-4">No Event Exist!</h3>
                    }
                </div>
                {/* <div className="mt-3">
                    <p className="font-weight-500">Upcoming Events</p>
                    <div className="card" onClick={() => navigate("/event-detail")} style={{ borderRadius: '20px', boxShadow: '0px 2px 4px 2px #eee' }}>
                        <div className="card-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-5 d-flex">
                                        <div className="card" style={{ width: '40px', height: '40px' }}>
                                            <div className="card-body"></div>
                                        </div>
                                        <p style={{marginLeft:'15px'}} className="pt-2 mb-0">Team 1</p>
                                    </div>
                                    <div className="col-2 pt-2">VS</div>
                                    <div className="col-5 d-flex float-right">
                                    <p style={{marginRight:'15px'}} className="pt-2 mb-0">Team 2</p>
                                        <div className="card" style={{ width: '40px', height: '40px' }}>
                                            <div className="card-body"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-center m-0 p-0">dd/mm.hh:mm, venue </p>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <p className="font-weight-500">Past Events</p>
                    <div className="card" onClick={() => navigate("/event-detail")} style={{ borderRadius: '20px', boxShadow: '0px 2px 4px 2px #eee' }}>
                        <div className="card-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-5 d-flex">
                                        <div className="card" style={{ width: '40px', height: '40px' }}>
                                            <div className="card-body"></div>
                                        </div>
                                        <p style={{marginLeft:'15px'}} className="pt-2 mb-0">Team 1</p>
                                    </div>
                                    <div className="col-2 pt-2">VS</div>
                                    <div className="col-5 d-flex float-right">
                                    <p style={{marginRight:'15px'}} className="pt-2 mb-0">Team 2</p>
                                        <div className="card" style={{ width: '40px', height: '40px' }}>
                                            <div className="card-body"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-center m-0 p-0">dd/mm.hh:mm, venue </p>
                        </div>
                    </div>
                </div> */}
            </div>
            <Footer />
        </>
    )
}
export default Events;