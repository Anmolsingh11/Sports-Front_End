import { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import { getAllItenerary } from "../../../Api/Itinerary";




const Itinerary = () => {

    const [data,setData]=useState([])
    const [date,setDate]=useState("25/01/2023");

    useEffect(()=>{
        getAllItenerary(date).then((result)=>{
            setData(result.data.Itineraries)
        }).
        catch((err)=>{
            console.log('Here i got an error Woo hoo!',err)
        })
    },[date])


    return (
        <>
            <Navbar />
            <div className="card mt-3 mx-3" style={{borderRadius:'0.938rem',boxShadow:'0px 0.125rem 0.25rem 0.125rem #eee'}}>
                <div className="card-body">
                    <p>
                        itinerary
                        <select style={{float:'right'}}  onChange={(e)=>{setDate(e.target.value)}}>
                            <option value={"25/01/2023"} selected>25nd jan</option>
                            <option value={"26/01/2023"}>26rd jan</option>
                        </select>
                    </p>
                    {data &&data.length>0?data.map((itinerary)=>(
                        <>
                        <p>{itinerary._id}</p>
                        {itinerary?.Itineraries&&itinerary.Itineraries.length>0?itinerary.Itineraries.map((result)=>(
                            <div className="container-fluid">
                            <div className="row">
                                <div className="col-4">
                                    <p>{result.time}</p>
                                </div>
                                <div className="col-6">
                        <p>{result.EventDetail[0].eventName}<br/> {result.EventDetail[0].venue}</p>
                                </div>
                            </div>
                        </div>
                        )):"NO Itinerary Available!"}
                        
                    </>
                    )):""}
                   
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Itinerary;