// import { InputLabel, MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';

const SignUpModal = ({ handleClose }) => {
    const { apiHost } = useUser();
    const [mobileNumber, setMobileNumber] = useState();
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [userRoleId, setUserRoleId] = useState(-1);
    const [companyId, setCompanyId] = useState(-1);

    const [passwordError, setPasswordError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [userRoles, setUserRoles] = useState([{ roleId: 1, roleName: 'Engineer' }, { roleId: 2, roleName: 'Director' }, { roleId: 3, roleName: 'Store Manager' }, { roleId: 5, roleName: 'Project Manager' }]);

    console.log(apiHost);
    useEffect(() => {
        let url = `${apiHost}common/company`;
        fetch(url).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })

    }, [])

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

    const verifyPassword = (pass) => {
        if (password !== pass) {
            setPasswordError("Passwords do not match");
        }
    }

    const signUp = () => {
        console.log(mobileNumber);
        console.log(password);
    }




    return (
        <>
            <div className="bg-white w-fit h-fit mx-auto">
                <p className="text-red-500 text-center text-2xl mb-4 font-semibold">Create Account</p>
                <div className="mt-2">
                    <label className="font-semibold">Name <span className="text-red-600">*</span></label>
                    <input onChange={(e) => { setName(e.target.value) }} type="text" placeholder='Enter your full name' className="border-2 px-2 border-black w-[100%] h-[5vh] rounded-md shadow-md" />
                </div>
                <div>
                    <label className="font-semibold" htmlFor="mobile">Mobile Number <span className="text-red-600">*</span></label>
                    <input placeholder='Enter mobile number' type="number" className="border-2 px-2 border-black w-[100%] h-[5vh] rounded-md shadow-md" onChange={(e) => { handleMobileNumber(e.target.value) }} />
                    {mobileError !== '' && <p className="text-red-600">{mobileError}</p>}
                </div>

                <div>
                    <label className="font-semibold" htmlFor="mobile">Designation <span className="text-red-600">*</span></label>
                    <br />
                    <select
                        className="border-2 border-black rounded-lg w-full h-[5vh] font-medium"
                        id="demo-simple-select"
                        value={userRoleId}
                        label="Designation"
                        onChange={(e) => { setUserRoleId(e.target.value) }}>
                        <option className="border border-black rounded-lg" value={0}>Select</option>

                        {userRoles.map((userRole) => {
                            {/* console.log(userRole.roleName); */ }
                            return <option className="border border-black rounded-lg" value={userRole.roleId}>{userRole.roleName}</option>
                        })}
                    </select>
                </div>


                <div className="mt-2">
                    <label className="font-semibold">Password <span className="text-red-600">*</span></label>
                    <input placeholder='set your password' onChange={(e) => { setPassword(e.target.value) }} type="password" className="border-2 px-2 border-black w-[100%] h-[5vh] rounded-md shadow-md" />
                </div>
                <div className="mt-2 mb-8">
                    <label className="font-semibold">Confirm Password <span className="text-red-600">*</span></label>
                    <input placeholder='re-enter your password' onChange={(e) => { verifyPassword(e.target.value) }} type="password" className="border-2 px-2 border-black w-[100%] h-[5vh] rounded-md shadow-md" />
                    {passwordError !== '' && <p className="text-red-600">{passwordError}</p>}
                </div>

                <div className="flex flex-row justify-between w-[100%] mr-auto mt-4">
                    <button className={`font-medium text-lg border border-black px-4 py-1 rounded-lg shadow-lg ${(mobileError !== '' || password === '') ? 'bg-gray-200' : 'bg-blue-200'}`} disabled={mobileError !== '' || password === ''} onClick={signUp}>SignUp</button>
                    <button className="font-medium text-lg border border-black px-4 py-1  bg-blue-200 rounded-lg shadow-lg" onClick={handleClose}>Close</button>
                </div>
            </div>
        </>
    )
}

export default SignUpModal;