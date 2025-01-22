import React, { useState, useEffect } from 'react'
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import { Dialog, DialogContent } from "@mui/material";
import ProcessingDialog from './ProcessingDialog';
import OrderApprovalModal from './OrderApprovalModal';

const ApprovalPage = () => {

    const { token, apiHost } = useUser();
    const [userData, setUserData] = useState();
    const [userId, setUserId] = useState();
    const [orders, setOrders] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [canApprove, setCanApprove] = useState(false);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [openApprovalModal, setOpenApprovalModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState();
    const [pendingFilter, setPendingFilter] = useState(true);



    useEffect(() => {
        // console.log(token);
        let user = localStorage.getItem('userData');
        if (user) {
            setDataLoading(true);
            console.log(user);
            let userDataa = JSON.parse(user);
            console.log(userDataa);
            setUserData(userDataa);

            let url = `${apiHost}orders/getOrders?userId=0`;
            console.log(url);
            // console.log(userId);
            axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${userDataa.token}`,
                }
            }).then((res) => {
                console.log(res);
                console.log(res.data.data);
                setOrders(res.data.data);
                setFilteredOrders(res.data.data);
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                console.log(orders);
                setDataLoading(false);
            })
        }


    }, [openApprovalModal]);

    const changeOrderStatus = async (orderId, statusName) => {
        let url = `${apiHost}orders/updateOrderStatus`;
        let data = {
            orderId: +orderId,
            status: statusName.toString()
        }

        console.log(data);

        setDataLoading(true);

        try {
            axios.put(url, data, {
                headers: {
                    'Authorization': `Bearer ${userData.token}`,
                }
            }).then((res) => {
                console.log(res);
                setDataLoading(false);
            })
        }
        catch (err) {
            console.log(err);
            setDataLoading(false);
        }
    }

    const handleClose = () => {
        setOpenApprovalModal(false);
    }
    const handleOpen = (order) => {
        console.log(order);
        setSelectedOrder(order);
        setOpenApprovalModal(true);

    }

    const filterData = (name) => {
        let searchedName = name.toString();
        setFilteredOrders(orders);
        let totalOrders = orders;
        console.log(searchedName);

        let filtered = totalOrders.filter((order) => {
            if (order.employeeName.toLowerCase().includes(searchedName.toLowerCase())) {
                return order;
            }
        });
        console.log(filtered);

        setFilteredOrders(filtered);
    }

    const handleCheckbox = (value) => {
        setPendingFilter(!pendingFilter);
        console.log(pendingFilter);

        if (pendingFilter) {
            let totalOrders = orders;

            let filtered = totalOrders.filter((order) => {
                if (order.status.toLowerCase() === 'pending') {
                    return order;
                }
            });

            setFilteredOrders(filtered);
        }
        else {
            setFilteredOrders(orders);
        }
    }

    return (
        <>
            <div className="min-h-[83vh] h-fit" style={{ backgroundImage: 'url(https://i.imgur.com/ypcFiNh.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', }}>

                <div>
                    <div className="overflow-x-auto">
                        <p className="text-lg text-center text-blue-500 font-semibold mb-4 mt-6">Approve the orders as required..</p>

                        <div className="flex flex-row justify-start gap-x-6 mb-4">
                            <input type="text" placeholder="Type here to search by Name" className="border border-black rounded-md px-3 ml-2 py-2 w-[90%]  bg-slate-300 text-black" onChange={(e) => filterData(e.target.value)} />


                            {/* <button className="gradient-primary-button px-5 text-lg mt-2 mb-2 py-1">Filter</button> */}
                        </div>
                        <div>
                            <label className=' text-base mr-4 font-medium pl-3' htmlFor="checkbox">View Pending Approvals</label>
                            <input onClick={(e) => { handleCheckbox(e.target.value) }} type="checkbox" id="checkbox" className="checkbox tex-lg" />
                        </div>

                        <table className="w-[95%] mx-auto bg-white rounded-lg shadow-lg mt-6">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                    <th className=" py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                                    <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredOrders.map((order, index) => (
                                    <>
                                        <tr key={index}>
                                            <td className="px-2 py-3 whitespace-nowrap text-xs">{order.product_name}</td>
                                            <td className=" py-3 whitespace-nowrap text-xs">{order.product_quantity}</td>
                                            <td className="px-2 py-3 whitespace-nowrap text-center text-xs">
                                                <button onClick={() => { handleOpen(order) }} className='gradient-primary-button px-3 py-1'>View</button>
                                            </td>

                                        </tr>

                                        <tr>
                                            <td colSpan="4" className=' pb-2'>
                                                <p className="px-2 py-1 text-xs text-gray-500">Order Placed by - <span className="uppercase text-xs text-black font-medium">{order.employeeName}</span> on <span className="uppercase text-xs text-black font-medium">{new Date(order.ordered_on).toLocaleDateString('en-GB')}</span></p>
                                            </td>
                                        </tr>
                                        <tr className=' border-transparent'>
                                            <td colSpan="4" className=' pb-12'>
                                                <p className="px-2 py-1 text-xs text-gray-500">Current Status - <span className={`uppercase text-xs font-medium ${order.status === 'Order Received' ? 'text-green-500' : order.status === 'Order Placed' ? 'text-blue-400' : order.status === 'Approved' ? 'text-blue-400' : order.status === 'Pending' ? 'text-black' : 'text-red-500'}`}>{order.status}</span></p>
                                            </td>
                                        </tr>
                                    </>
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

            <Dialog open={openApprovalModal} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogContent>
                    <OrderApprovalModal orderDetails={selectedOrder} handleClose={handleClose} />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ApprovalPage;