import React from 'react';
import CountUp from 'react-countup';
import { BiDollar } from 'react-icons/bi'
import { FcBusinessman } from 'react-icons/fc'
import { MdFeedback, MdProductionQuantityLimits } from 'react-icons/md'

const Summary = () => {
    return (
        <>
            <div>
                <h1 className="text-center text-3xl my-6">Our Business Summary</h1>
            </div>
            <div className="stats stats-vertical xs:stats-horizontal shadow w-full">

                <div className="stat flex flex-col items-center justify-center">
                    <div className="stat-title">Annual Revenue</div>
                    <div className="stat-value"><BiDollar></BiDollar></div>
                    <div className="stat-value"><CountUp end={18000} duration={7} /></div>

                    <div className="stat-desc">Jan 1st 2021 - Feb 1st 2022</div>
                </div>

                <div className="stat flex flex-col items-center justify-center">
                    <div className="stat-title">Total Customers</div>
                    <div className="stat-value"><FcBusinessman></FcBusinessman></div>
                    <div className="stat-value"><CountUp end={2000} duration={7} /></div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat flex flex-col items-center justify-center">
                    <div className="stat-title">Total Reviews</div>
                    <div className="stat-value"><MdFeedback></MdFeedback></div>
                    <div className="stat-value"><CountUp end={500} duration={7} /></div>
                    <div className="stat-desc">↗︎ 90 (26%)</div>
                </div>
                <div className="stat flex flex-col items-center justify-center">
                    <div className="stat-title">Products Sold</div>
                    <div className="stat-value"><MdProductionQuantityLimits></MdProductionQuantityLimits></div>
                    <div className="stat-value"><CountUp end={370} duration={7} /></div>
                    <div className="stat-desc">↗︎ 120(15%)</div>
                </div>

            </div>
        </>
    );
};

export default Summary;