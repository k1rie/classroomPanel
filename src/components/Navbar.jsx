import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import NavBarStyles from '../styles/navbar.module.css';
import HomeSvg from '../assets/home-angle-2-svgrepo-com.svg'; // Asegúrate de importar correctamente tu SVG

const Navbar = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const quitPhoneBar = useRef()
  const toggleThemeElement = useRef()
  const navBar = useRef()
  const openMenu = useRef()


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

    const setDarkMode = ()=>{
      document.querySelector("body").setAttribute('data-theme','dark')
    }
  

    const setLightMode = ()=>{
      document.querySelector("body").setAttribute('data-theme','light')
    }
  

  const toggleTheme = (e)=>{
    if(e.target.checked) {setDarkMode()
      localStorage.setItem("theme","dark")
    }
      else {
        setLightMode()
        localStorage.setItem("theme","light")

      }
  }

  useEffect(()=>{
 if(localStorage.getItem("theme") === "dark"){
  setDarkMode()
toggleThemeElement.current.checked = "true"
 }




  },[])

  useEffect(()=>{
    if(isOpen === true && window.getComputedStyle(openMenu.current).display === "block"){
      navBar.current.style.transform = "translateX(0%)"

    }
    document.addEventListener('mousedown', (e)=>{
      if(e.target !== navBar.current && isOpen === false && window.getComputedStyle(openMenu.current).display === "block"){
  console.log("jijijijajaa")
  console.log(isOpen)
  navBar.current.style.transform = "translateX(-100%)"
  navBar.current.style.position = "fixed"
  setIsOpen(false)
      }else{

      }
    })
  },[isOpen])
  return (
    <>
 
      {/* Botón de menú para dispositivos móviles */}
      <button
      ref={openMenu}
        className={NavBarStyles.menuButton}
        onClick={()=>{setIsOpen(true)}}
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
      <div ref={navBar}
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
          <div className={NavBarStyles.switchModeContainer}>
<label className={NavBarStyles.switch}>
    <input ref={toggleThemeElement} type="checkbox"  onChange={toggleTheme}/>
    <span className={NavBarStyles.slider}></span>
</label>
</div>
          <Link to="/"><button onClick={logOut} className={NavBarStyles.logOut}>Cerrar Sesion</button></Link>
          {/* Añade más opciones de menú aquí */}
          
        </div>
        
      </div>
    </>
  );
};

export default Navbar;