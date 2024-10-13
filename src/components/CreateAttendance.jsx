import { useRef,useState, useEffect } from "react"
import { useParams } from 'react-router-dom';

import styles from "../styles/createattendance.module.css"
import exitSVG from "../assets/exit-svgrepo-com.svg"

const CreateAttendance = (props)=>{
    const {id,grade,group,area} = useParams()
    const container = useRef()
    const correctText = useRef()
    const [date,setDate] = useState()

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica del formulario, como enviar los datos a un servidor.
        const credentials = btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`);
    
    await fetch("https://tasksflow-backend.onrender.com/createAttendance",{
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
            date: date,
            id:id
        })
    }).then(data=>data.json()).then(data=>{
    if(data.response === true){
        correctText.current.style.display="block"
    }
    })
        console.log('Fecha:', date);
      };

      useEffect(()=>{
        console.log(props.showCreateAttendance)
        if(props.showCreateAttendance === true){
            container.current.style.display = "flex"
        }else{
            container.current.style.display = "none"
    
        }
    },[props.showCreateAttendance])
    
    
    return(
<div>
<div ref={container} className={styles.container}>
 <img className={styles.exitSVG} src={exitSVG} onClick={()=>{
        container.current.style.display = "none"
        props.setShowCreateAttendance(false)
    }}/>
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
     

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
        <p ref={correctText} className={styles.correct}>Asistencia Generada</p>
      </form>
    </div>
    </div>
</div>
    )
}

export default CreateAttendance