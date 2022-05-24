import React from 'react';

const AdminProducCard = ({ product, setProductModal, refetch }) => {
    const { img, available, description, _id, price, name, minimum } = product;
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure><img src={img} alt="Shoes" className="rounded-xl h-[200px]" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
                <p>Available : {available} pcs</p>
                <p>Minimum buy : {minimum} pcs</p>
                <p>Price Per Piece : ${price}</p>
                <div className="card-actions justify-between">
                    <label htmlFor="product-modal" className="modal-button cursor-pointer btn btn-success" onClick={() => setProductModal(product)}>Edit</label>
                    <button className="btn btn-error">Delete</button>
                </div>
            </div>
        </div >
    );
};

export default AdminProducCard;