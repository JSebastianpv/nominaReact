import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const NavBar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary mt-5">
            <div className="container-fluid">
                <Link 
                    className="navbar-brand" 
                    to="/"
                >
                    Nomina
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        {/* <NavLink 
                            className="nav-item nav-link" 
                            to="/movimientos"
                        >
                            Movimientos
                        </NavLink> */}
                    </li>
                    <li className="nav-item">
                        <NavLink 
                            className="nav-item nav-link" 
                            to="/empleados"
                        >
                            Empleados
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink 
                            className="nav-item nav-link" 
                            to="/roles"
                        >
                            Roles
                        </NavLink>
                    </li>
                </ul>
                </div>
            </div>
        </nav>

    </div>
  )
}
