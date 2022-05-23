import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { BiUserCircle } from 'react-icons/bi'
import Star from '../../utilities/Star';

const Review = ({ review }) => {
    const { name, feedback, email, rating, date } = review;
    const [ratingArray, setRatingArray] = useState([])
    useEffect(() => {
        const empty = []
        for (let i = 0; i < rating; i++) {
            empty.push(i)
        }
        setRatingArray(empty)
    }, [rating])
    return (
        <div className="card bg-info text-primary-content">
            <div className="card-body">
                <div className="flex items-center mb-4">
                    <div className="flex justify-center">
                        <BiUserCircle className="text-3xl"></BiUserCircle>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center">
                        <p className="text-2xl">{name}</p>
                        <p>{email}</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <span>Rating : </span>
                    <div className="flex">
                        {ratingArray?.map(index =>
                            <Star key={index}></Star>
                        )}
                    </div>
                </div>
                <p className="text-center font-bold text-lg">Reviewed on : {format(new Date(date), 'PP')}</p>
                <p className='text-center'>{feedback}</p>
            </div>
        </div>
    );
};

export default Review;