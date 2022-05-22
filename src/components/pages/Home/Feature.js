import React from 'react';
import './Feature.css'
import { BsGlobe } from 'react-icons/bs'
import { AiTwotoneSecurityScan } from 'react-icons/ai'
import { BiSupport } from 'react-icons/bi'
import { GiReceiveMoney } from 'react-icons/gi'
import { FaShippingFast, FaGlobeAsia } from 'react-icons/fa'

const Feature = () => {
    return (
        <>
            <div className="section-head my-8">
                <h4><span>Why Choose</span> Us?</h4>
                <p>When you choose us, you'll feel the benefit of 3 years experience of manufacture. Because we know the digital world and we know that how to handle it. With working knowledge of previous experience we will give you the best output.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                <div className="item">
                    <div className="flex justify-center">
                        <span className="icon one flex justify-center items-center"><BsGlobe></BsGlobe></span>
                    </div>
                    <h6>Shipping All over the World</h6>
                    <p>You can order any amount of products from all over the world</p>
                </div>
                <div className="item">
                    <div className="flex justify-center">
                        <span className="icon two flex justify-center items-center"><AiTwotoneSecurityScan></AiTwotoneSecurityScan></span>
                    </div>
                    <h6>Security Issue</h6>
                    <p>Your orders will be 100% secure and you will not be scammed</p>
                </div>
                <div className="item">
                    <div className="flex justify-center">
                        <span className="icon three flex justify-center items-center"><BiSupport></BiSupport></span>
                    </div>
                    <h6>24 x 7 User Support</h6>
                    <p>If our customer has any problem and any query we are always happy to help then.</p>
                </div>
                <div className="item">
                    <div className="flex justify-center">
                        <span className="icon four flex justify-center items-center"><GiReceiveMoney></GiReceiveMoney></span>
                    </div>
                    <h6>Affordable Cost</h6>
                    <p>We sell the profucts on low cost compare to other manufacturers</p>
                </div>
                <div className="item">
                    <div className="flex justify-center">
                        <span className="icon five flex justify-center items-center"><FaShippingFast></FaShippingFast></span>
                    </div>
                    <h6>Fast Shipping</h6>
                    <p>Our shipping method is super fast so it takes maximum 3-4 week days.</p>
                </div>
                <div className="item">
                    <div className="flex justify-center">
                        <span className="icon six flex justify-center items-center"><FaGlobeAsia></FaGlobeAsia></span>
                    </div>
                    <h6>International Payment</h6>
                    <p>You can pay us with any kind of international payment credit card with stripe and it is very secure procedure.</p>
                </div>
            </div>
        </>
    );
};

export default Feature;