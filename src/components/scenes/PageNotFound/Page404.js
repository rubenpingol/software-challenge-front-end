import React from 'react'
import { Link } from 'react-router-dom';

export default function Page404() {
    return (
        <div>
            <h1>Page not found!</h1>
            <p>Go back to <Link to="/">homepage</Link>.</p>
        </div>
    )
}
