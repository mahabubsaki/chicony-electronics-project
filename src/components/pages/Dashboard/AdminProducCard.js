import React from 'react';

const AdminProducCard = ({ product, setProductModal }) => {
    const { img, available, description, _id, price, name, minimum } = product;
    return (
        <div class="card bg-base-100 shadow-xl">
            <figure><img src={img} alt="Shoes" className="rounded-xl h-[200px]" /></figure>
            <div class="card-body">
                <h2 class="card-title">{name}</h2>
                <p>{description}</p>
                <p>Available : {available} pcs</p>
                <p>Minimum buy : {minimum} pcs</p>
                <p>Price Per Piece : ${price}</p>
                <div class="card-actions justify-between">
                    <label htmlFor="product-modal" className="modal-button cursor-pointer btn btn-success" onClick={() => setProductModal(product)}>Edit</label>
                    <button class="btn btn-error">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default AdminProducCard;