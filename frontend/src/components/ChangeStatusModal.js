import React, { useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import ProcessingDialog from './ProcessingDialog';
import Snackbar from '@mui/material/Snackbar';

const ChangeStatusModal = ({ handleClose, orderDetails }) => {

    const [dataLoading, setDataLoading] = useState(false);
    const { apiHost } = useUser();
    const [orderStatus, setOrderStatus] = useState();
    const [comments, setComments] = useState();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState();

    const updateOrderStatus = async () => {
        let user = localStorage.getItem('userData');
        if (user) {
            let userData = JSON.parse(user);
            let url = `${apiHost}orders/updateOrderStatus`;

            let data = {
                orderId: +orderDetails.id,
                status: orderStatus.toString(),
                storeComment: comments.toString()
            }

            console.log(data);

            try {
                setDataLoading(true);
                setOpenSnackbar(true);
                axios.put(url, data, {
                    headers: {
                        'Authorization': `Bearer ${userData.token}`,
                    }
                }).then((res) => {
                    setSnackBarMessage(`${res.data.message}, this pop-up will close in 2 seconds`);
                    setDataLoading(false);
                    setOpenSnackbar(true);

                    setTimeout(() => {
                        handleClose();
                    }, 2000);

                }).catch((err) => {
                    setSnackBarMessage(`${err.message}, this pop-up will close in 2 seconds`);
                    setDataLoading(false);
                    setOpenSnackbar(true);
                })
            }
            catch (err) {
                setSnackBarMessage(`${err?.response?.data?.message}, this pop-up will close in 2 seconds`);
                setDataLoading(false);
                setOpenSnackbar(true);

                setTimeout(() => {
                    handleClose();
                }, 2000);
                console.log(err);
            }
        }
    }

    console.log(orderDetails);
    return (
        <>
            <div>

                <div>
                    <p className=' text-center font-semibold text-blue-500 text-lg'>Order Details:</p>
                    <p className="text-base text-left mt-2"> <span className=' text-red-500'>*</span> Product Name - <span className="font-semibold">{orderDetails.product_name}</span></p>

                    <p className="text-base text-left mt-2"> <span className=' text-red-500'>*</span> Product Quantity - <span className="font-semibold">{orderDetails.product_quantity}</span></p>

                    <p className="text-base text-left mt-2"> <span className=' text-red-500'>*</span> Order Date - <span className="font-semibold">{new Date(orderDetails.ordered_on).toLocaleDateString('en-GB')}</span></p>

                    <p className="text-base text-left mt-2"><span className=' text-red-500'>*</span> Current Status - <span className="font-semibold">{orderDetails.status}</span></p>

                    <p className="text-base text-left mt-2"> <span className=' text-red-500'>*</span> Product details - <span className="font-semibold">{orderDetails.details}</span></p>

                    <p className="text-base text-left mt-2"> <span className=' text-red-500'>*</span> Management Comments - <span className="font-semibold">{orderDetails.management_comment}</span></p>
                </div>
                <select onChange={(e) => { setOrderStatus(e.target.value) }} name="status" className="border border-black rounded-lg w-full h-[5vh] mt-6 font-medium">
                    <option value="">Update Status (click to select)</option>
                    <option value="Order Placed">Order Placed</option>
                    <option value="Order Received">Order Received</option>
                    <option value="Order not Placed">Order Not Placed</option>
                </select>

                <div className=' mt-4'>
                    <label htmlFor="comments" className=' text-black font-semibold '>Add Comment (optional)</label>
                    <textarea onChange={(e) => { setComments(e.target.value) }} name="comment" className=' px-2 py-1 border border-black rounded-lg shadow-md h-24 mt-2 w-full' placeholder='example : Order is placed and is expected after 1 week'></textarea>
                </div>

                <div className=' flex flex-row justify-between mt-3'>
                    <button onClick={updateOrderStatus} className='gradient-primary-button px-3 py-1'>Update Order</button>
                    <button onClick={handleClose} className='non-button-primary px-3 py-1'>Close</button>
                </div>
            </div>

            <Dialog open={dataLoading} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogContent>
                    <ProcessingDialog />
                </DialogContent>
            </Dialog>

            <Snackbar
                // anchorOrigin={{ vertical, horizontal }}
                open={openSnackbar}
                autoHideDuration={5000}
                message={snackBarMessage}
            />
        </>
    )
}

export default ChangeStatusModal;