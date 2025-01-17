import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
const Footer = () => {
    return (
        <div className="bg-black h-[7vh] px-8 text-center text-white pt-4 flex flex-row justify-between">
            <div className="font-semibold text-lg">
                Amber Suman
            </div>
            <div className="flex flex-row gap-x-8 pt-1">
                <a href="https://www.linkedin.com/in/ambrsumn/"><FontAwesomeIcon className=" text-red-600" icon={faLinkedin} /></a>
                <a href="https://github.com/ambrsumn/"><FontAwesomeIcon className="text-red-600" icon={faGithub} /></a>
                {/* <i className="fa-brands fa-github"></i> */}
            </div>
        </div>
    )
}
export default Footer