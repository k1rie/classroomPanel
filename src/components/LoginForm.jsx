
import React, { useRef, useState } from 'react';
import styles from '../styles/loginform.module.css';
import succesfullSvg from "../assets/check-circle-svgrepo-com.svg"
import { useNavigate } from 'react-router-dom';
import { BASE_API_URL } from '../api';

const AuthForm = () => {
  const [incorrectTextValue,setIncorrectTextValue] = useState("El correo o contraseña es incorrecto, intenta en breve")
  const [isLogin, setIsLogin] = useState(true);
  const [login,setLogin] = useState(true)
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const navigate = useNavigate()
  const succesfull = useRef()
  const form = useRef()
  const incorrectText = useRef()
  

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(isLogin === false){
        await fetch(BASE_API_URL + "/createUser",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                emailUser: email,
                password: password
            })
        }).then(data=>data.json()).then((data)=>{
          console.log(data)
          if(data.response === true){
            localStorage.setItem("email",email)
            localStorage.setItem("password",password)
                          form.current.style.display = "none"
          succesfull.current.style.display = "block"
            setTimeout(()=>{
              navigate(0)
            },2000)

          }else{
            incorrectText.current.style.display = "block"
            setIncorrectTextValue("Parece que el correo ya esta asociado a una cuenta o el servidor esta tardando más de lo normal")
          }
        })
    }else{
      const credentials = btoa(`${email}:${password}`);
        await fetch(BASE_API_URL + "/verifyUser",{
            method: "GET",
            headers:{
                'Authorization': `Basic ${credentials}`,
                "Content-Type": "application/json"
            },
           
        }).then(data=>data.json()).then(data=>{
            if(data.response === true){
                localStorage.setItem("email",data.data.email)
                localStorage.setItem("password",data.data.password)
                              form.current.style.display = "none"
              succesfull.current.style.display = "block"
                setTimeout(()=>{
                  navigate(0)
                },2000)

            }else{
              incorrectText.current.style.display = "block"
            }
        })
        
    }


};

  return (
    <div className={styles.container}>
      <img ref={succesfull} className={styles.succesfullSvg} src={succesfullSvg}/>
      <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
      <form ref={form} onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" required onChange={(e)=>{
            setEmail(e.target.value)
          }}/>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" required onChange={(e)=>{
            setPassword(e.target.value)
          }}/>
        </div>
        <button type="submit" className={styles.button}>
          {isLogin ? 'Ingresar' : 'Registrarse'}
        </button>
        <p ref={incorrectText} className={styles.incorrectText}>{incorrectTextValue}</p>
      </form>
      <p className={styles.toggle}>
        {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}{' '}
        <span onClick={()=>{toggleForm();setLogin(false)}} className={styles.link}>
          {isLogin ? 'Regístrate' : 'Inicia sesión'}
        </span>
      </p>
    </div>
  );
};

export default AuthForm;