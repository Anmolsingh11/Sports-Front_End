import { useEffect } from "react";
import Footer from "../../Footer";
import Navbar from "../../Navbar";
import Slider from "../../Slider";
import Sports from "../Sports";

const Home = () =>{

return (
    <>
    <Navbar/>
    <Slider/>
    <Sports/>
    <Footer active={"home"}/>
    </>
);
}

export default Home;