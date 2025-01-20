import React from 'react'
import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import { Link, useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { token, saveToken } = useUser();
    const [user, setUser] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [openSignup, setOpenSignup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("YES");
        let userDetails = localStorage.getItem("userData");
        console.log(token);
        if (userDetails) {
            let userDetailsParsed = JSON.parse(userDetails);
            setUser(userDetailsParsed);
            setIsLoggedIn(true);
            console.log(user);
        }

    }, [openLogin, openSignup]);

    // let handleOpenLogin()  {
    //     setOpenLogin(true);
    // }
    const handleOpenSignUp = () => {
        console.log("sign up opened");
        setOpenSignup(true);
    }
    const handleCloseLogin = () => {
        setOpenLogin(false);
    }
    const handleCloseSignUp = () => {
        setOpenSignup(false);
    }

    const handleOpenLogin = () => {
        console.log("sign up opened");
        setOpenLogin(true);
    };

    const handleOrdersClick = () => {
        navigate("/orders"); // Navigate to /orders
    };

    const logOut = () => {
        localStorage.removeItem("userData");
        setIsLoggedIn(false);
        saveToken(null);
        navigate("/");
    }


    return (
        <>
            <div id="main" className="h-[10vh] bg-black flex flex-row justify-between">
                <div className="">
                    <img src="https://i.imgur.com/obHWspi.jpeg" className="h-full w-[5rem]" alt="Logo" />
                </div>

                <div className="flex flex-row gap-x-6 pt-2 pr-8  font-semibold">
                    {isLoggedIn && <button className="text-white" onClick={handleOrdersClick}>Orders</button>}
                    {isLoggedIn && <button className="text-white" onClick={logOut}>Logout</button>}
                    {!isLoggedIn && <button className="text-white" onClick={handleOpenLogin} >Login</button>}
                    {!isLoggedIn && <button className="text-white" onClick={handleOpenSignUp} >Signup</button>}

                </div>

                <Dialog open={openLogin} onClose={handleCloseLogin}>
                    <DialogContent>
                        <LoginModal handleClose={handleCloseLogin} />
                    </DialogContent>
                    {/* <DialogActions>
                        <Button onClick={handleCloseLogin}>Close</Button>
                    </DialogActions> */}

                </Dialog>

                <Dialog open={openSignup} onClose={handleCloseSignUp}>
                    <DialogContent>
                        <SignUpModal handleClose={handleCloseSignUp} />
                    </DialogContent>
                    {/* <DialogActions>
                        <Button onClick={handleCloseLogin}>Close</Button>
                    </DialogActions> */}

                </Dialog>
            </div>
        </>
    )
}

export default Navbar;