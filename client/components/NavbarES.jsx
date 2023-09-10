import React from 'react'
import { setLogout } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'

const NavbarES = () => {
  const isAuth = useSelector((state) => state.token)
  const isSmallScreen = useMediaQuery({ query: "(max-width:968px)" })
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(setLogout())
  }
  return (
    <nav>
      <Link to="/" style={{ textDecoration: "none", display: "block", marginRight: "auto" }}><h2 style={{ marginRight: "auto" }}>G-MP3 Download</h2></Link>
      <div>
        {isAuth ? (
          <>
            <Link to="/downloads">
              <button className="gray-txt btn trans-btn">Mis Descargas</button>
            </Link>
            <button className="gray-txt btn trans-btn" onClick={() => handleLogout()}>Cerrar Sesion</button>
          </>
        ) : (
          <>
            <Link to="/register">
              {isSmallScreen ? (
                <i className="fa-solid fa-user-plus"></i>
              ) :
                <button className="white-txt btn trans-btn">Crear Usuario</button>
              }
            </Link> &nbsp;&nbsp;&nbsp;
            <Link to="/login">
              {isSmallScreen ? (
                <i className="fa-solid fa-right-to-bracket"></i>
              ) :
                <button className="white-txt btn trans-btn">Ingresar Cuenta</button>
              }
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavbarES