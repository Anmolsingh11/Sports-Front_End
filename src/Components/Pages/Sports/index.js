import { useNavigate } from "react-router-dom";

const Sports = () => {


    const sports = [
        {
            name: "Badminton",
            Icon: "/Images/badminton.png"
        },
        {
            name: "Squash",
            Icon: "/Images/squash.png"
        },
        {
            name: "Lawn Tennis",
            Icon: "/Images/tennis.png"
        },
        {
            name: "Table Tennis",
            Icon: "/Images/table-tennis.png"
        },
        {
            name: "Snooker",
            Icon: "/Images/snooker.png"
        },
        {
            name: "Volley Ball",
            Icon: "/Images/volleyball-net.png"
        },
        {
            name: "Kabaddi",
            Icon: ""
        },
        {
            name: "Cricket",
            Icon: "/Images/cricket-player.png"
        },
        {
            name: "Kho Kho",
            Icon: ""
        },
        {
            name: "Pithu",
            Icon: "/Images/medicine-ball.png"
        },
        {
            name: "Spoon Race",
            Icon: "/Images/spoon.png"
        },
        {
            name: "Tire Relay Race",
            Icon: ""
        },
        {
            name: "Relay Race",
            Icon: "/Images/relay.png"
        },
        {
            name: "Sack Race",
            Icon: "/Images/sack-race.png"
        },
        {
            name: "Tug Of War",
            Icon: "/Images/tug-of-war.png"
        },
        {
            name: "Three Leg Race",
            Icon: ""
        },
        {
            name: "Carrom",
            Icon: "/Images/carrom.png"
        },
        {
            name: "Musical Chair",
            Icon: "/Images/chair.png"
        },
        {
            name: "Beer Pong",
            Icon: "/Images/beer-pong.png"
        },
        {
            name: "March Past",
            Icon: "/Images/parade.png"
        },
        {
            name: "Tarang",
            Icon: ""
        },
        {
            name: "War Cry",
            Icon: "/Images/shout.png"
        },
        {
            name: "Star Wars",
            Icon: ""
        },
        {
            name: "Futsal",
            Icon: "/Images/futsal.png"
        },
    ]

    const navigate = useNavigate();

    return (
        <>
            <div id="sportsContainer" className="container-fluid mt-5" style={{ paddingBottom: "20%" }}>
                <div className="row">
                    {sports.map((item, index) => (
                        <div className="col-4" key={index}>
                            <div className="card my-3 card-border" onClick={() => navigate(`/events/${item.name}`)} style={{ width: '6.25rem', height: '6.25rem' }}>
                                <div className="card-body d-flex justify-content-center">
                                    {item.Icon === ""
                                        ?
                                        <p style={{ fontSize: '0.875rem', textAlign: 'center', marginTop: '0.938rem' }}>{item.name}</p>
                                        :
                                        <img src={`${item.Icon}`} alt={item.name} width={"40px"} height={"40px"} />
                                    }
                                </div>
                                <div className="footer">
                                    {item.Icon !== ""
                                        ?
                                        <p style={{ fontSize: '0.75rem', textAlign: 'center' }}>{item.name}</p>
                                        :
                                        ""
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Sports;