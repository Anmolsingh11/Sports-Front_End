import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    return (
        <div className="card header sticky-footer" style={{ borderRadius: "1.25rem 1.25rem 0px 0px" }}>
            <div className="card-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-4 d-flex justify-content-center">
                            <img src={"/Images/donut_largehome.svg"} alt={"go to home"} onClick={() => {
                                navigate("/"); if (document.getElementById("sportsContainer")) {
                                    document.getElementById("sportsContainer").scrollTo(0, 0);
                                }
                            }} />
                        </div>
                        <div className="col-4 d-flex justify-content-center">
                            <img src={"/Images/list-solid.svg"} width={"24px"} height={"24px"} alt={"go to home"} onClick={() => {
                                navigate("/leaderboard"); if (document.getElementById("sportsContainer")) {
                                    document.getElementById("sportsContainer").scrollTo(0, 0);
                                }
                            }} />
                        </div>
                        <div className="col-4 d-flex justify-content-center">
                            <img src={"/Images/Vectoritinerary.svg"} alt={"itinerary"} onClick={() => navigate("/itinerary")} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;