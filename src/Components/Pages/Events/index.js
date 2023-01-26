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
            <div className="mx-3" style={{paddingBottom: '30%'}}>
                <div className="mt-3">
                    <p className="font-weight-500">Live Events</p>
                    {loading
                        ?
                        <div className="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="sr-only"></span>
                            </div>
                        </div>
                        :
                        events?.length > 0 ? events.map((item, index) => (
                            <>
                                {
                                    item.status == "active"
                                        ?
                                        <div className="card mx-3 mt-3" key={index} onClick={() => navigate(`/event-detail/${item._id}`)} style={{ borderRadius: '1.25rem', boxShadow: '0px 0.125rem 0.25rem 0.125rem #eee' }}>
                                            <div className="card-body" style={{padding: "0.5rem 0.5rem"}}>
                                                <p className="text-center h5">{item.eventName}</p>
                                                <div className="container-fluid" style={{ paddingLeft: '0px' }}>
                                                    {item.eventType === "MultiPlayer"
                                                        ?
                                                        <div className="row">
                                                            <div className="col-5 d-flex">
                                                                <img
                                                                    src={item.teamName[0]?.logo}
                                                                    alt=""
                                                                    style={{ width: '1.875rem', height: '1.875rem' }}
                                                                />
                                                                <p
                                                                    style={{ marginLeft: "15px" }}
                                                                    className="pt-2 mb-0"
                                                                >
                                                                    {item.eventName}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        :
                                                        item.eventType === "Team"
                                                            ?
                                                            <div className="row">
                                                                <div className="col-5 d-flex">
                                                                    <img src={item?.teamName[0]?.logo} alt="" style={{ width: '1.875rem', height: '1.875rem' }} />
                                                                    <p style={{ marginLeft: '0.938rem' }} className=" mb-0">{item?.teamName[0]?.teamName}</p>
                                                                </div>
                                                                <div className="col-2 pt-2">VS</div>
                                                                <div className="col-5 d-flex float-right">
                                                                    <p style={{ marginRight: '0.938rem' }} className=" mb-0">{item?.teamName[1]?.teamName}</p>
                                                                    <img src={item?.teamName[1]?.logo} alt="" style={{ width: '1.875rem', height: '1.875rem' }} />
                                                                </div>
                                                            </div>
                                                            :
                                                            item.eventType === "Player"
                                                                ?
                                                                <div className="row">
                                                                    <div className="col-5 d-flex">
                                                                        <img src={item?.teamName[0]?.logo} alt="" style={{ width: '1.875rem', height: '1.875rem' }} />
                                                                        <p style={{ marginLeft: '0.938rem' }} className=" mb-0">{item?.teamName[0]?.name}</p>
                                                                    </div>
                                                                    <div className="col-2 pt-2">VS</div>
                                                                    <div className="col-5 d-flex float-right">
                                                                        <p style={{ marginRight: '0.938rem' }} className=" mb-0">{item?.teamName[1]?.name}</p>
                                                                        <img src={item?.teamName[1]?.logo} alt="" style={{ width: '1.875rem', height: '1.875rem' }} />
                                                                    </div>
                                                                </div>
                                                                :
                                                                ""}
                                                </div>
                                                <p className="text-center m-0 p-0">{item.date.split("-").reverse().join("-")} || {item.time} <br/> {item.venue} </p>
                                            </div>
                                        </div>
                                        :
                                        ""
                                }
                            </>
                        )) : <h3 className="text-center mt-4 pt-4">No Event Exist!</h3>
                    }
                </div>
                <div className="mt-3">
                    <p className="font-weight-500">Upcoming Events</p>
                    {loading
                        ?
                        <div className="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="sr-only"></span>
                            </div>
                        </div>
                        :
                        events?.length > 0 ? events.map((item, index) => (
                            <>
                                {
                                    item.status === undefined
                                        ?
                                        <div className="card mx-3 mt-3" key={index} onClick={() => navigate(`/event-detail/${item._id}`)} style={{ borderRadius: '1.25rem', boxShadow: '0px 0.125rem 0.25rem 0.125rem #eee' }}>
                                            <div className="card-body" style={{padding: "0.5rem 0.5rem"}}>
                                                <p className="text-center h5">{item.eventName}</p>
                                                <div className="container-fluid" style={{ paddingLeft: '0px' }}>
                                                    {item.eventType === "MultiPlayer"
                                                        ?
                                                        <div className="row">
                                                            <div className="col-5 d-flex">
                                                                <img
                                                                    src={item.teamName[0]?.logo}
                                                                    alt=""
                                                                    style={{ width: '1.875rem', height: '1.875rem' }}

                                                                />
                                                                <p
                                                                    style={{ marginLeft: "15px" }}
                                                                    className="pt-2 mb-0"
                                                                >
                                                                    {item.eventName}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        :
                                                        item.eventType === "Team"
                                                            ?
                                                            <div className="row">
                                                                <div className="col-5 d-flex">
                                                                    <img src={item?.teamName[0]?.logo} alt="" style={{ width: '1.875rem', height: '1.875rem' }} />
                                                                    <p style={{ marginLeft: '0.938rem' }} className=" mb-0">{item?.teamName[0]?.teamName}</p>
                                                                </div>
                                                                <div className="col-2 pt-2">VS</div>
                                                                <div className="col-5 d-flex float-right">
                                                                    <p style={{ marginRight: '0.938rem' }} className=" mb-0">{item?.teamName[1]?.teamName}</p>
                                                                    <img src={item?.teamName[1]?.logo} alt="" style={{ width: '1.875rem', height: '1.875rem' }} />
                                                                </div>
                                                            </div>
                                                            :
                                                            item.eventType === "Player"
                                                                ?
                                                                <div className="row">
                                                                    <div className="col-5 d-flex">
                                                                        <img src={item?.teamName[0]?.logo} alt="" style={{ width: '1.875rem', height: '1.875rem' }} />
                                                                        <p style={{ marginLeft: '0.938rem' }} className=" mb-0">{item?.teamName[0]?.name}</p>
                                                                    </div>
                                                                    <div className="col-2 pt-2">VS</div>
                                                                    <div className="col-5 d-flex float-right">
                                                                        <p style={{ marginRight: '0.938rem' }} className=" mb-0">{item?.teamName[1]?.name}</p>
                                                                        <img src={item?.teamName[1]?.logo} alt="" style={{ width: '1.875rem', height: '1.875rem' }} />
                                                                    </div>
                                                                </div>
                                                                :
                                                                ""}
                                                </div>
                                                <p className="text-center m-0 p-0">{item.date.split("-").reverse().join("-")} || {item.time} <br/> {item.venue} </p>
                                            </div>
                                        </div>
                                        :
                                        ""
                                }
                            </>
                        )) : <h3 className="text-center mt-4 pt-4">No Event Exist!</h3>
                    }
                </div>
                <div className="mt-3">
                    <p className="font-weight-500">Past Events</p>
                    {loading
                        ?
                        <div className="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="sr-only"></span>
                            </div>
                        </div>
                        :
                        events?.length > 0 ? events.map((item, index) => (
                            <>
                                {
                                    item.status == "closed"
                                        ?
                                        <div className="card mx-3 mt-3" key={index} style={{ borderRadius: '1.25rem', boxShadow: '0px 0.125rem 0.25rem 0.125rem #eee', opacity: '0.6' }}>
                                            <div className="card-body" style={{padding: "0.5rem 0.5rem"}}>
                                                <p className="text-center h5">{item.eventName}</p>
                                                <div className="container-fluid" style={{ paddingLeft: '0px' }}>
                                                    {item.eventType === "MultiPlayer"
                                                        ?
                                                        <div className="row">
                                                            <div className="col-5 d-flex">
                                                                <img
                                                                    src={item.teamName[0]?.logo}
                                                                    alt=""
                                                                    style={{ width: '1.875rem', height: '1.875rem' }}
                                                                />
                                                                <p
                                                                    style={{ marginLeft: "15px" }}
                                                                    className="pt-2 mb-0"
                                                                >
                                                                    {item.eventName}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        :
                                                        item.eventType === "Team"
                                                            ?
                                                            <div className="row">
                                                                <div className="col-5 d-flex">
                                                                    <img src={item?.teamName[0]?.logo} alt="" style={{ width: '1.875rem', height: '1.875rem' }} />
                                                                    <p style={{ marginLeft: '0.938rem' }} className=" mb-0">{item?.teamName[0]?.teamName}</p>
                                                                </div>
                                                                <div className="col-2 pt-2">VS</div>
                                                                <div className="col-5 d-flex float-right">
                                                                    <p style={{ marginRight: '0.938rem' }} className=" mb-0">{item?.teamName[1]?.teamName}</p>
                                                                    <img src={item?.teamName[1]?.logo} alt="" style={{ width: '1.875rem', height: '1.875rem' }} />
                                                                </div>
                                                            </div>
                                                            :
                                                            item.eventType === "Player"
                                                                ?
                                                                <div className="row">
                                                                    <div className="col-5 d-flex">
                                                                        <img src={item?.teamName[0]?.logo} alt="" style={{ width: '1.875rem', height: '1.875rem' }} />
                                                                        <p style={{ marginLeft: '0.938rem' }} className=" mb-0">{item?.teamName[0]?.name}</p>
                                                                    </div>
                                                                    <div className="col-2 pt-2">VS</div>
                                                                    <div className="col-5 d-flex float-right">
                                                                        <p style={{ marginRight: '0.938rem' }} className=" mb-0">{item?.teamName[1]?.name}</p>
                                                                        <img src={item?.teamName[1]?.logo} alt="" style={{ width: '1.875rem', height: '1.875rem' }} />
                                                                    </div>
                                                                </div>
                                                                :
                                                                ""}
                                                </div>
                                                <p className="text-center m-0 p-0">{item.date.split("-").reverse().join("-")} || {item.time} <br/> {item.venue} </p>
                                            </div>
                                        </div>
                                        :
                                        ""
                                }
                            </>
                        )) : <h3 className="text-center mt-4 pt-4">No Event Exist!</h3>
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}
export default Events;