import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../utilities/Loading';
import Review from './Review';

const Reviews = () => {
    const { data, isLoading } = useQuery('reviews', async () => {
        return await axios({
            method: 'GET',
            url: 'https://mysterious-shore-40767.herokuapp.com/all-reviews'
        })
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="mb-5">
            <h1 className="text-3xl text-center mb-5">Latest Reviews</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {
                    data?.data?.map(review => <Review
                        key={review._id}
                        review={review}
                    ></Review>)
                }
            </div>
        </div>
    );
};

export default Reviews;