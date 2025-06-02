import React from 'react'
import { Link } from 'react-router-dom'

function HomeButton() {
    return (
        <Link to="/">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer">
                Dashboard
            </button>
        </Link>
    )
}

export default HomeButton
