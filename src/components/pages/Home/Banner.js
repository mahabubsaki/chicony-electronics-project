import React from 'react';

const Banner = () => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: "url(https://c4.wallpaperflare.com/wallpaper/777/165/94/nvidia-gpus-geforce-computer-wallpaper-preview.jpg" }}>
            <div className="hero-overlay bg-opacity-70"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Welcome to Chicony Electronics</h1>
                    <p className="mb-5">We manufacture one of the best desktop parts in this area. Inspiration and innovation every week. Our customer review is maximum time positive and they get their order on time. Shipping under 3 days after you complete any purchase.</p>
                    <button className="btn btn-error">Checkout Products</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;