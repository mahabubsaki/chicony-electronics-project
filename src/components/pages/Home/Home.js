import React from 'react';
import Banner from './Banner';
import Feature from './Feature';
import Products from './Products';
import Summary from './Summary';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Summary></Summary>
            <Feature></Feature>
            <Products></Products>
        </div>
    );
};

export default Home;