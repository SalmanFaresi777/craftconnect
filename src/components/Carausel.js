import React from 'react'

export default function Carousel() {
    return (
        <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" id='carousel'>
                    <div className="carousel-caption" style={{ zIndex: "10" }}>
                        <form className="d-flex justify-content-center">
                            <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search for courses..." aria-label="Search" />
                            <button className="btn btn-outline-light text-white bg-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920" className="d-block w-100" style={{ filter: "brightness(30%)", height: "500px", objectFit: "cover" }} alt="Students studying in library" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920" className="d-block w-100" style={{ filter: "brightness(30%)", height: "500px", objectFit: "cover" }} alt="Group study session" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1920" className="d-block w-100" style={{ filter: "brightness(30%)", height: "500px", objectFit: "cover" }} alt="Modern classroom setting" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}