// CreatePermission.js
import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/createpermission.module.css';
import { useParams } from 'react-router-dom';
import exitSVG from "../assets/exit-svgrepo-com.svg"
import { BASE_API_URL } from '../api';

const CreatePermission = (props) => {
    const {id,grade,group,area} = useParams()
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');
  const correctText = useRef()
  const container = useRef()

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica del formulario, como enviar los datos a un servidor.
    const credentials = btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`);

await fetch(BASE_API_URL + "/createPermission",{
    method: "POST",
    headers:{
        'Authorization': `Basic ${credentials}`,
        "Content-Type":"application/json"
    },
    body: JSON.stringify({
        name: props.name,
        lastName: props.lastName,
        grade:grade,
        group:group,
        area: area,
        reason: reason,
        date: date,
id:id
    })
}).then(data=>data.json()).then(data=>{
if(data.response === true){
    correctText.current.style.display="block"
}
})
    console.log('Razón:', reason);
    console.log('Fecha:', date);
  };

  
useEffect(()=>{
    console.log(props.showCreatePermissions)
    if(props.showCreatePermissions === true){
        container.current.style.display = "flex"
    }else{
        container.current.style.display = "none"

    }
},[props.showCreatePermissions])



  return (
    <div ref={container} className={styles.container}>
 <button className={styles.exitSVG}  onClick={()=>{
        container.current.style.display = "none"
        props.setShowCreatePermissions(false)
    }}>X</button>
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="reason" className={styles.label}>Razón</label>
          <input
            type="text"
            id="reason"
            className={styles.input}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Ingrese la razón"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="date" className={styles.label}>Fecha</label>
          <input
            type="date"
            id="date"
            className={styles.input}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.button}>Enviar</button>
        <p ref={correctText} className={styles.correct}>Permiso creado</p>
      </form>
    </div>
    </div>
  );
};

export default CreatePermission;
