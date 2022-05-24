import React from 'react';

const Portfolio = () => {
    return (
        <div className="min-h-[500px] flex justify-center items-center">
            <div className="w-3/5 mx-auto">
                <h1>Name : Mahabub Saki</h1>
                <h1>Email : mahabub.saki.bd@gmail.com</h1>
                <h1>Education : HSC Batch (2021)</h1>
                <h1>Technologies :</h1>
                <ul class="menu bg-base-100 grid grid-cols-2 sm:grid-cols-3">
                    <li><span>HTML5</span></li>
                    <li><span>CSS3</span></li>
                    <li><span>JavaScript</span></li>
                    <li><span>ES6</span></li>
                    <li><span>Tailwind</span></li>
                    <li><span>Bootstrap</span></li>
                    <li><span>React</span></li>
                    <li><span>NodeJS</span></li>
                    <li><span>ExpressJs</span></li>
                    <li><span>MongoDB</span></li>
                    <li><span>Github</span></li>
                </ul>
                <h1>Project 1 Link : https://sportofista-47ddf.web.app/</h1>
                <h1>Project 2 Link : https://red-onion-c3cf9.web.app/</h1>
                <h1>Project 3 Link : https://medispace-416d4.web.app/</h1>
            </div>
        </div>
    );
};

export default Portfolio;