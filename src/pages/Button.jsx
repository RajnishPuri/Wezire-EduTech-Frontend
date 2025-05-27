import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ text, active, link }) => {
    return (
        <Link to={link}>
            <button className={`px-4 py-2 rounded-md text-white hover:scale-95 transition-all duration-200
                ${active ? "bg-yellow-100 text-richblack-900" : "bg-richblack-800"
                }
                `}>
                {text}
            </button>
        </Link>
    )
}

export default Button