import React, { useState } from 'react'
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import ProcessingDialog from './ProcessingDialog';
import { Dialog, DialogContent } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';

const PlaceOrder = ({ handleClose }) => {
    const { apiHost } = useUser();
    const [productName, setProductName] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [nameError, setNameError] = useState('');
    const [quantityError, setQuantityError] = useState('');
    const [processingModal, setProcessingModal] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const [details, setDetails] = useState();

    const handleName = (enteredName) => {
        let name2 = enteredName.toString();
        console.log(name2);
        if (name2 === '') {
            setNameError("Please enter product name");
        }
        else {
            setNameError("");
            setProductName(name2);
        }
    }

    const handleQuantity = (enteredName) => {
        let name2 = enteredName.toString();
        console.log(name2);
        if (name2 === '') {
            setQuantityError("Please enter product quantity and unit");
        }
        else {
            setQuantityError("");
            setProductQuantity(name2);
        }
    }

    const placeOrder = async () => {
        setProcessingModal(true);
        let data = {
            productName: productName,
            productQuantity: productQuantity,
            details: details.toString()
        }

        let user = localStorage.getItem('userData');
        if (user) {
            let userData = JSON.parse(user);
            let token = userData.token;

            let url = `${apiHost}orders/postOrder`;

            try {
                axios.post(url, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }).then((res) => {
                    console.log(res);
                    setSnackBarMessage("Order placed successfully");
                    setOpenSnackbar(true);

                    handleClose();
                }).catch((err) => {
                    console.log(err);
                })
            }
            catch (error) {
                console.log(error);
                setSnackBarMessage("Error placing order");
                setOpenSnackbar(true);
            }
            finally {
                setProcessingModal(false);
            }
        }
    }

    return (
        <>
            <div className="">
                <p className="text-xl font-bold text-center">Place new order</p>

                <div className="mt-2">
                    <label className="font-semibold">Product Name <span className="text-red-600">*</span></label>
                    <input onChange={(e) => { handleName(e.target.value) }} type="text" placeholder='Enter Product Name' className="border-2 px-2 border-black w-[100%] h-[5vh] rounded-md shadow-md" />
                    {nameError !== '' && <p className="text-red-600">{nameError}</p>}
                </div>
                <div className="mt-4">
                    <label className="font-semibold" htmlFor="mobile">Product Quantity <span className="text-red-600">*</span></label>
                    <input placeholder='Enter Quantity with unit' type="text" className="border-2 px-2 border-black w-[100%] h-[5vh] rounded-md shadow-md" onChange={(e) => { handleQuantity(e.target.value) }} />
                    {quantityError !== '' && <p className="text-red-600">{quantityError}</p>}
                </div>

                <div className=' mt-4'>
                    <label htmlFor="comments" className=' text-black font-semibold '>Add Details (optional)</label>
                    <textarea onChange={(e) => { setDetails(e.target.value) }} name="comment" className=' px-2 py-1 border border-black rounded-lg shadow-md h-24 mt-2 w-full' placeholder='need it urgently for SH-56'></textarea>
                </div>

                <div className="flex flex-row justify-between">
                    <button className="gradient-primary-button text-base py-2 px-3 font-medium mt-7" onClick={placeOrder} disabled={productName === '' || productQuantity === ''}>Place Order</button>

                    <button className="text-base px-2 font-medium border-2 rounded-lg shadow-md mt-7" onClick={handleClose}>Cancel</button>
                </div>
            </div>

            <Dialog open={processingModal} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
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

export default PlaceOrder;