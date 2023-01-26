import { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import { getAllItenerary } from "../../../Api/Itinerary";




const Itinerary = () => {

    const [data,setData]=useState([])
    const [date,setDate]=useState("");

    useEffect(()=>{
        getAllItenerary(date.split("/").reverse().join("-")).then((result)=>{
            setData(result.data.Itineraries)
        }).
        catch((err)=>{
            console.log('Here i got an error Woo hoo!',err)
        })
    },[date])


    return (
        <>
            <Navbar />
            <div className="card mt-3 mx-3" style={{borderRadius:'0.938rem',boxShadow:'0px 0.125rem 0.25rem 0.125rem #eee', marginBottom: '30%'}}>
                <div className="card-body">
                    <p>
                        Itinerary
                        <select style={{float:'right'}}  onChange={(e)=>{setDate(e.target.value)}}>
                            <option selected>Select Date</option>
                            <option value={"27/01/2023"} >27th January</option>
                            <option value={"28/01/2023"}>28th January</option>
                        </select>
                    </p>
                    {data &&data.length>0?data.map((itinerary)=>(
                        <>
                        <p>{date === "" ? itinerary._id.split("-").reverse().join("-") : date.split("/").join("-")}</p>
                        {itinerary?.Itineraries&&itinerary.Itineraries.length>0?itinerary.Itineraries.map((result)=>(
                            <div className="container-fluid">
                            <div className="row">
                                <div className="col-4">
                                    <p>{result.time}</p>
                                </div>
                                <div className="col-8">
                        <p>{result.eventName}<br/> <span>{result.venue}</span></p>
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