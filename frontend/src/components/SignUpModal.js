// import { InputLabel, MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';
import { Dialog, DialogContent } from '@mui/material';
import ProcessingDialog from './ProcessingDialog';
import Snackbar from '@mui/material/Snackbar';


const SignUpModal = ({ handleClose }) => {
    const { apiHost } = useUser();
    const [mobileNumber, setMobileNumber] = useState();
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [userRoleId, setUserRoleId] = useState(-1);
    const [companyId, setCompanyId] = useState(-1);
    const [strongPasswordError, setStrongPasswordError] = useState('');
    const [openProcessingDialog, setOpenProcessingDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [passwordError, setPasswordError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [nameError, setNameError] = useState('');
    const [userRoles, setUserRoles] = useState([{ roleId: 1, roleName: 'Engineer' }, { roleId: 2, roleName: 'Director' }, { roleId: 4, roleName: 'Store Manager' }, { roleId: 6, roleName: 'Project Manager' }]);
    const [companies, setCompanies] = useState([]);

    console.log(apiHost);
    useEffect(() => {
        let url = `${apiHost}common/company`;
        axios.get(url).then((res) => {
            console.log(res);
            console.log(res.data);
            setCompanies(res.data.data);
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

    const handleName = (enteredName) => {
        let name2 = enteredName.toString();
        console.log(name2);
        if (name2 === '') {
            setNameError("Please enter your name");
        }
        else {
            setNameError("");
            setName(name2);
        }
    }
    const handlePassword = (password) => {
        console.log(password);
        let passwordCopy = password.toString();
        if (passwordCopy.length < 8) {
            setStrongPasswordError("Password must contain at least one uppercase letter, one lowercase letter, and one number and should be minimum 8 characters");
        }
        else {
            /[A-Z]/.test(passwordCopy) ? setStrongPasswordError("") : setStrongPasswordError("Password must contain at least one uppercase letter, one lowercase letter, and one number and should be minimum 8 characters");

            /[a-z]/.test(passwordCopy) ? setStrongPasswordError("") : setStrongPasswordError("Password must contain at least one uppercase letter, one lowercase letter, and one number and should be minimum 8 characters");

            /[0-9]/.test(passwordCopy) ? setStrongPasswordError("") : setStrongPasswordError("Password must contain at least one uppercase letter, one lowercase letter, and one number and should be minimum 8 characters");
        }
        console.log(passwordCopy);
        setPassword(passwordCopy);
    }

    const verifyPassword = (pass) => {
        console.log(password, pass);
        console.log(password, pass);
        if (password !== pass) {
            setPasswordError("Passwords do not match");
        }
        else {
            setPasswordError('');
        }
    }

    const signUp = async () => {
        console.log(mobileNumber);
        console.log(password);
        console.log(name);
        console.log(userRoleId);
        console.log(companyId);
        console.log(passwordError);

        setOpenProcessingDialog(true);
        let url = `${apiHost}authentication/user/signup`;
        console.log(url);

        setTimeout(() => {
            setOpenProcessingDialog(false);
        }, 2000);



        let data = {
            "name": name,
            "userRole": +userRoleId,
            "password": password,
            "mobileNumber": mobileNumber,
            "companyId": +companyId
        };

        try {
            const res = await axios.post(url, data).then((res) => {
                console.log(res);
                setOpenSnackbar(true);
                setTimeout(() => {
                    handleClose();
                }, 3000);


            }).catch((err) => {
                console.log(err);
            }).finally(() => {

            })
        }
        catch (err) {
            console.log(err);
        }

        // console.log(data);
    }




    return (
        <>
            <div className="bg-white w-fit h-fit mx-auto">
                <p className="text-red-500 text-center text-2xl mb-4 font-semibold">Create Account</p>
                <div className="mt-2">
                    <label className="font-semibold">Name <span className="text-red-600">*</span></label>
                    <input onChange={(e) => { handleName(e.target.value) }} type="text" placeholder='Enter your full name' className="border-2 px-2 border-black w-[100%] h-[5vh] rounded-md shadow-md" />
                    {nameError !== '' && <p className="text-red-600">{nameError}</p>}
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
                        id="designation"
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

                <div>
                    <label className="font-semibold" htmlFor="mobile">Organization <span className="text-red-600">*</span></label>
                    <br />
                    <select
                        className="border-2 border-black rounded-lg w-full h-[5vh] font-medium"
                        id="designation"
                        value={companyId}
                        label="Organization"
                        onChange={(e) => { setCompanyId(e.target.value) }}>
                        <option className="border border-black rounded-lg" value={0}>Select</option>

                        {companies.map((company) => {
                            {/* console.log(userRole.roleName); */ }
                            return <option className="border border-black rounded-lg" value={company.id}>{company.companyName}</option>
                        })}
                    </select>
                </div>


                <div className="mt-2">
                    <label className="font-semibold">Password <span className="text-red-600">*</span></label>
                    <input placeholder='set your password' onChange={(e) => { handlePassword(e.target.value) }} type="password" className="border-2 px-2 border-black w-[100%] h-[5vh] rounded-md shadow-md" />
                    {strongPasswordError !== '' && <p className="text-red-600">{strongPasswordError}</p>}
                </div>
                <div className="mt-2 mb-8">
                    <label className="font-semibold">Confirm Password <span className="text-red-600">*</span></label>
                    <input placeholder='re-enter your password' onChange={(e) => { verifyPassword(e.target.value) }} type="password" className="border-2 px-2 border-black w-[100%] h-[5vh] rounded-md shadow-md" />
                    {passwordError !== '' && <p className="text-red-600">{passwordError}</p>}
                </div>

                <div className="flex flex-row justify-between w-[100%] mr-auto mt-4">
                    <button className={`font-medium text-lg border border-black px-4 py-1 rounded-lg shadow-lg ${(mobileError !== '' || strongPasswordError !== '' || passwordError !== '' || userRoleId === -1 || companyId === -1 || name === '') ? 'bg-gray-200' : 'bg-blue-200'}`} disabled={mobileError !== '' || strongPasswordError !== '' || passwordError !== '' || userRoleId === -1 || companyId === -1 || name === ''} onClick={signUp}>SignUp</button>
                    <button className="font-medium text-lg border border-black px-4 py-1  bg-blue-200 rounded-lg shadow-lg" onClick={handleClose}>Close</button>
                </div>
            </div>

            <Dialog open={openProcessingDialog}>
                <DialogContent>
                    <ProcessingDialog />
                </DialogContent>

            </Dialog>

            <Snackbar
                // anchorOrigin={{ vertical, horizontal }}
                open={openSnackbar}
                autoHideDuration={5000}
                message="Account created sucessfully, please login."
            />
        </>
    )
}

export default SignUpModal;