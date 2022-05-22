import React, { useEffect, useState } from 'react';
import { BiUserCircle } from 'react-icons/bi'
import { BsFillStarFill } from 'react-icons/bs'

const Review = ({ review }) => {
    const { name, feedback, email, rating } = review;
    const [ratingArray, setRatingArray] = useState([])
    useEffect(() => {
        const empty = []
        for (let i = 0; i < rating; i++) {
            empty.push(i)
        }
        setRatingArray(empty)
    }, [rating])
    console.log(ratingArray);
    return (
        <div class="card bg-error text-primary-content">
            <div class="card-body">
                <div className="flex items-center mb-4">
                    <div className="flex justify-center">
                        <BiUserCircle className="text-3xl"></BiUserCircle>
                    </div>
                    <div className="w-4/5 flex flex-col justify-center items-center">
                        <p className="text-2xl">{name}</p>
                        <p>Email : {email}</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <span>Rating : </span>
                    <div className="flex">
                        {ratingArray?.map(each => <BsFillStarFill className='text-warning mx-1'></BsFillStarFill>)}
                    </div>
                </div>
                <p className='text-center'>{feedback}</p>
            </div>
        </div>
    );
};

export default Review;