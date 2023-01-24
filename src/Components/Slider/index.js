const Slider = () => {
    return (
        <>
            <div id="carouselExampleIndicators" className="carousel mt-5 px-3 slide" data-bs-ride="true">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    {/* <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button> */}
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        {/* <div className="card" style={{ height: '100px', borderRadius: '1.25rem' }}>
                            <div className="card-body"></div>
                        </div> */}
                        <img src={"/Images/b1.webp"} width="100%" height={"auto"} style={{borderRadius:'0.938rem'}}/>
                    </div>
                    <div className="carousel-item">
                        {/* <div className="card" style={{ height: '100px', borderRadius: '1.25rem' }}>
                            <div className="card-body"></div>
                        </div> */}
                        <img src={"/Images/b2.webp"} width="100%" height={"auto"} style={{borderRadius:'0.938rem'}}/>
                    </div>
                    {/* <div className="carousel-item">
                        <div className="card" style={{ height: '100px', borderRadius: '1.25rem' }}>
                            <div className="card-body"></div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="card" style={{ height: '100px', borderRadius: '1.25rem' }}>
                            <div className="card-body"></div>
                        </div>
                    </div> */}
                </div>
                {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button> */}
            </div>
        </>
    );
}

export default Slider;