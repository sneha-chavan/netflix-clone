import React, { useEffect, useState } from 'react'
import './Nav.css';

function Nav() {
    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 200) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll");
        }
    }, [])

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img
                className="logo"
                src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
                alt="netflix logo"
            />
            <img
                className="avtar"
                src="https://akarotakdot.files.wordpress.com/2018/04/logo-dream-league-soccer-2017-panda-keren.png"
                alt="avtar logo"
            />
        </div>
    )
}

export default Nav
