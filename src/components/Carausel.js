import React from 'react'

export default function Carousel() {
    return (
        <div className="carousel-wrapper position-relative">
            <div 
                id="carouselExampleFade" 
                className="carousel slide carousel-fade" 
                data-bs-ride="carousel"
                data-bs-interval="3000"  
                data-bs-pause="false"    
            >
                <div className="carousel-inner" id='carousel'>
                    {/* Search Overlay */}
                    <div className="carousel-caption position-absolute top-50 start-50 translate-middle w-100" style={{ zIndex: "9" }}>
                        <div className="container">
                            <h1 className="display-4 fw-bold mb-4 text-white">Welcome to CraftConnect</h1>
                            <p className="lead mb-4 text-white">Bring your desired skills to real world</p>
                            <form className="d-flex justify-content-center gap-2 max-width-500 mx-auto">
                                <div className="input-group">
                                    <input 
                                        className="form-control form-control-lg border-end-0" 
                                        type="search" 
                                        placeholder="Search Your Desire..." 
                                        aria-label="Search"
                                    />
                                    <button className="btn btn-primary btn-lg" type="submit">
                                        <i className="bi bi-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Carousel Items */}
                    <div className="carousel-item active">
                        <img 
                            src="/learn_1.jpg"
                            className="d-block w-100" 
                            style={{ 
                                filter: "brightness(40%)",
                                height: "600px",
                                objectFit: "cover"
                            }} 
                            alt="Learning Skills" 
                        />
                    </div>
                    <div className="carousel-item">
                        <img 
                            src="/learn_2.jpg"
                            className="d-block w-100" 
                            style={{ 
                                filter: "brightness(40%)",
                                height: "600px",
                                objectFit: "cover"
                            }} 
                            alt="Learning Skills" 
                        />
                    </div>
                    <div className="carousel-item">
                        <img 
                            src="/learn_3.jpg"
                            className="d-block w-100" 
                            style={{ 
                                filter: "brightness(40%)",
                                height: "600px",
                                objectFit: "cover"
                            }} 
                            alt="Learning Skills" 
                        />
                    </div>
                </div>

                {/* Carousel Indicators */}
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleFade" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
            </div>

            {/* Optional: Add a subtle gradient overlay */}
            <div 
                className="position-absolute bottom-0 w-100" 
                style={{
                    height: "150px",
                    background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))",
                    zIndex: "8"
                }}
            ></div>
        </div>
    )
}