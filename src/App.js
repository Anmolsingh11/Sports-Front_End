import { Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Itinerary from "./Components/Pages/Itinerary";
import { ToastContainer } from 'react-toastify';
import Events from "./Components/Pages/Events";
import EventDetail from "./Components/Pages/EventDetail";
import Leaderboard from "./Components/Pages/Leaderboard";

const App = () => {
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/itinerary" element={<Itinerary/>}/>
      <Route exact path="/leaderboard" element={<Leaderboard/>}/>
      <Route exact path="/events/:sportName" element={<Events/>}/>
      <Route exact path="/event-detail/:id" element={<EventDetail/>}/>
    </Routes>
    </>
  );
}

export default App;
