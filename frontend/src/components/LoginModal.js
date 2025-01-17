import react from 'react'
import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { TextField, Button } from '@mui/material';

const LoginModal = ({ handleClose }) => {
    const [mobileNumber, setMobileNumber] = useState();
    const [password, setPassword] = useState('');

    const [mobileError, setMobileError] = useState('');

    const handleMobileNumber = (mobileNumber) => {
        let mobileNumber2 = mobileError;
        mobileNumber2 = mobileNumber.toString();

        if (mobileNumber2.length !== 10) {
            setMobileError("Please enter a valid mobile number");
        }
        else {
            setMobileError("");
            setMobileNumber(mobileNumber2);
        }
    }

    const login = () => {
        console.log(mobileNumber);
        console.log(password);
    }




    return (
        <>
            <div className="bg-white w-fit h-fit mx-auto">
                <p className="text-red-500 text-center text-2xl mb-4 font-semibold">Welcome back..</p>
                <div>
                    <label className="font-semibold" htmlFor="mobile">Mobile Number <span className="text-red-600">*</span></label>
                    <input type="number" className="border-2 px-2 border-black w-[100%] h-[5vh] rounded-md shadow-md" onChange={(e) => { handleMobileNumber(e.target.value) }} />
                    {mobileError !== '' && <p className="text-red-600">{mobileError}</p>}
                </div>
                <div className="mt-2 mb-8">
                    <label className="font-semibold">Password <span className="text-red-600">*</span></label>
                    <input onChange={(e) => { setPassword(e.target.value) }} type="password" className="border-2 px-2 border-black w-[100%] h-[5vh] rounded-md shadow-md" />
                </div>

                <div className="flex flex-row justify-between w-[100%] mr-auto mt-4">
                    <button className={`font-medium text-lg border border-black px-4 py-1 rounded-lg shadow-lg ${(mobileError !== '' || password === '') ? 'bg-gray-200' : 'bg-blue-200'}`} disabled={mobileError !== '' || password === ''} onClick={login}>Login</button>
                    <button className="font-medium text-lg border border-black px-4 py-1  bg-blue-200 rounded-lg shadow-lg" onClick={handleClose}>Close</button>
                </div>
            </div>
        </>
    )
}
export default LoginModal;