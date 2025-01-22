import React, { useState, useEffect } from 'react'
import { useUser } from '../contexts/UserContext';

const ViewOrderDetails = ({ orderDetails, handleClose }) => {

    return (
        <>
            <div>
                <p className=' text-center font-semibold text-blue-500 text-lg'>Order Details:</p>
                <p className="text-base text-left mt-2"> <span className=' text-red-500'>*</span> Product Name - <span className="font-semibold">{orderDetails.product_name}</span></p>

                <p className="text-base text-left mt-2"> <span className=' text-red-500'>*</span> Product Quantity - <span className="font-semibold">{orderDetails.product_quantity}</span></p>

                <p className="text-base text-left mt-2"> <span className=' text-red-500'>*</span> Order Date - <span className="font-semibold">{new Date(orderDetails.ordered_on).toLocaleDateString('en-GB')}</span></p>

                <p className="text-base text-left mt-2"><span className=' text-red-500'>*</span> Current Status - <span className="font-semibold">{orderDetails.status}</span></p>

                <p className="text-base text-left mt-2"> <span className=' text-red-500'>*</span> Product details - <span className="font-semibold">{orderDetails.details}</span></p>

                <p className="text-base text-left mt-2"> <span className=' text-red-500'>*</span> Management Comments - <span className="font-semibold">{orderDetails.management_comment}</span></p>

                <p className="text-base text-left mt-2"> <span className=' text-red-500'>*</span> Store Comments - <span className="font-semibold">{orderDetails.comments}</span></p>
            </div>

            <div className='flex justify-center mt-8 flex-row'>
                <button onClick={handleClose} className='non-button-primary px-3 py-1'>Close</button>

            </div>
        </>
    )
}

export default ViewOrderDetails