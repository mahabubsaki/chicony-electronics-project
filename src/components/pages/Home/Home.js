import React from 'react';
import About from './About';
import Banner from './Banner';
import Feature from './Feature';
import Products from './Products';
import Reviews from './Reviews';
import Summary from './Summary';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Summary></Summary>
            <Feature></Feature>
            <Products></Products>
            <Reviews></Reviews>
            <About></About>
        </div>
    );
};

export default Home;