import React, { useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import NavBarStyles from '../styles/navbar.module.css';
import HomeSvg from '../assets/home-angle-2-svgrepo-com.svg'; // Asegúrate de importar correctamente tu SVG

const Navbar = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const quitPhoneBar = useRef()


  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    quitPhoneBar.current.style.display="block"
  };

  const focusOption = (e) => {
    // Lógica para manejar el foco de la opción
  };
  
  const logOut = ()=>{
    if(location.pathname === "/"){
      navigate(0)
    }
    localStorage.removeItem("email")
    localStorage.removeItem("password")
  }

  return (
    <>
      {/* Botón de menú para dispositivos móviles */}
      <button
        className={NavBarStyles.menuButton}
        onClick={toggleMenu}
        aria-label="Abrir menú"
      >
        {/* Ícono del menú (hamburguesa) */}
        <svg viewBox="0 0 100 80" fill="#333">
          <rect width="100" height="15"></rect>
          <rect y="30" width="100" height="15"></rect>
          <rect y="60" width="100" height="15"></rect>
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`${NavBarStyles.container} ${
          isOpen ? NavBarStyles.active : ''
        }`}
      >
                            <button onClick={toggleMenu} ref={quitPhoneBar} className={NavBarStyles.quitPhoneBar}>X</button>

        <div className={NavBarStyles.menuContainer}>
          
          <p className={NavBarStyles.menuTittle}>MENU</p>
          <Link
            to="/"
            className={NavBarStyles.optionContainer}
            onClick={(e) => {
              focusOption(e);
              if (window.innerWidth <= 768) {
                setIsOpen(false); // Cerrar el menú en móvil al hacer clic en una opción
              }
            }}
          >

            <img className={NavBarStyles.optionSvg} src={HomeSvg} alt="Home" />
            <p className={NavBarStyles.optionTittle}>Home</p>
          </Link>
          <Link to="/"><button onClick={logOut} className={NavBarStyles.logOut}>Cerrar Sesion</button></Link>
          {/* Añade más opciones de menú aquí */}
          
        </div>
      </div>
    </>
  );
};

export default Navbar;