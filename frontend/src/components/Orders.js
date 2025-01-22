import react, { useEffect, useState } from 'react'
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import ProcessingDialog from './ProcessingDialog';
import PlaceOrder from './PlaceOrder';
import { useNavigate } from 'react-router-dom';
import ViewOrderDetails from './ViewOrderDetails';

const Orders = () => {

    const { token, apiHost } = useUser();
    const [userData, setUserData] = useState();
    const [userId, setUserId] = useState();
    const [orders, setOrders] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [openPlaceOrder, setOpenPlaceOrder] = useState(false);
    const [canApprove, setCanApprove] = useState(false);
    const [canChangeStatus, setCanChangeStatus] = useState(false);
    const [openOrderDetails, setOpenOrderDetails] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState();

    const navigate = useNavigate();



    useEffect(() => {
        let selectedUserRole = 0;
        // console.log(token);
        let user = localStorage.getItem('userData');
        if (user) {
            setDataLoading(true);
            console.log(user);
            let userDataa = JSON.parse(user);
            console.log(userDataa);
            setUserData(userDataa);

            if (userDataa.userRole === 5 || userDataa.userRole === 2 || userDataa.userRole === 6) {
                setCanApprove(true);
            }

            if (userDataa.userRole === 4) {
                setCanChangeStatus(true);
            }
            // else {
            //     setUserId(userDataa.userId);
            //     selectedUserRole = userDataa.userId;
            // }
            selectedUserRole = userDataa.userId;

            console.log(selectedUserRole);

            let url = `${apiHost}orders/getOrders?userId=${selectedUserRole}`;
            console.log(url);
            console.log(userId);
            axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${userDataa.token}`,
                }
            }).then((res) => {
                console.log(res);
                console.log(res.data.data);
                setOrders(res.data.data);
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                console.log(orders);
                setDataLoading(false);
            })
        }


    }, [openPlaceOrder, dataLoading])

    const openPlaceOrderModal = () => {
        setOpenPlaceOrder(true);
        console.log(openPlaceOrder);
    }

    const handleOpen = (order) => {
        console.log(order);
        setSelectedOrder(order);
        setOpenOrderDetails(true);
    };

    const handleClose = () => {
        setOpenOrderDetails(false);
    };

    const closePlaceOrderModal = () => {
        setOpenPlaceOrder(false);
    }

    const navigateToApproval = () => {
        navigate('/approvals');
    }
    const navigateToProcessingPage = () => {
        navigate('/proocess-orders');
    }

    return (
        <>
            <div className="h-[83vh]" style={{ backgroundImage: 'url(https://i.imgur.com/Q2obufb.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', }}>

                <div className="flex flex-row justify-between px-4 py-8">
                    <button className="gradient-primary-button text-sm py-2 px-3 font-medium" onClick={openPlaceOrderModal}>Place new Order</button>
                    {canApprove && <button className="gradient-primary-button text-sm py-2 px-3 font-medium" onClick={navigateToApproval} >View Pending approvals</button>}
                    {canChangeStatus && <button className="gradient-primary-button text-base py-2 px-3 font-medium" onClick={navigateToProcessingPage} >See Orders</button>}

                </div>

                <div>

                    <div className="overflow-x-auto">
                        <p className="text-lg text-center text-blue-500 font-semibold mb-4">Orders placed by you</p>
                        <table className="w-[95%] mx-auto bg-white rounded-lg shadow-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                    <th className=" py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                                    <th className="px-2 py-2 text-left pl-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {orders.map((order, index) => (
                                    <tr key={index}>
                                        <td className="px-2 py-3 whitespace-nowrap text-xs">{order.product_name}</td>
                                        <td className="px-2 py-3 whitespace-nowrap text-xs">{order.product_quantity}</td>
                                        <td className="px-2 pl-4 py-3 whitespace-nowrap text-xs">{new Date(order.ordered_on).toLocaleDateString('en-GB')}</td>

                                        <td><button onClick={() => { handleOpen(order) }} className='gradient-primary-button px-3 py-1'>View</button></td>

                                    </tr>
                                ))}


                            </tbody>
                            {orders.length === 0 && <p className="text-center mt-2 mb-2 font-semibold text-gray-500">No orders placed yet.</p>}
                        </table>
                    </div>
                </div>

            </div>

            <Dialog open={dataLoading} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogContent>
                    <ProcessingDialog />
                </DialogContent>
            </Dialog>

            <Dialog open={openPlaceOrder} aria-labelledby="ale" aria-describedby="ale">
                <DialogContent>
                    <PlaceOrder handleClose={closePlaceOrderModal} />
                </DialogContent>
            </Dialog>

            <Dialog open={openOrderDetails} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogContent>
                    <ViewOrderDetails handleClose={handleClose} orderDetails={selectedOrder} />
                </DialogContent>
            </Dialog>
        </>
    )
}
export default Orders;