import { useRef,useState, useEffect } from "react"
import { useParams } from 'react-router-dom';

import styles from "../styles/createattendance.module.css"
import exitSVG from "../assets/exit-svgrepo-com.svg"
import { BASE_API_URL } from "../api";

const GetAttendances = (props)=>{
    const {id} = useParams()
    const container = useRef()
    const correctText = useRef()
    const [date,setDate] = useState()

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica del formulario, como enviar los datos a un servidor.
        const credentials = btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`);
        await fetch(BASE_API_URL + `/getAttendances/${id}/${date}`, {
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error('Error en la descarga del archivo.');
            }
            return response.blob(); // Convertir la respuesta en un Blob
        })
        .then(blob => {
            // Crear una URL temporal para el Blob
            const url = window.URL.createObjectURL(blob);
       
            // Crear un enlace temporal
            const a = document.createElement('a');
            a.href = url;
            a.download = `asistencia ${props.grade} ${props.group} ${props.area}.xlsx`; // Nombre del archivo a descargar
            document.body.appendChild(a);
            a.click(); // Simular un clic en el enlace para iniciar la descarga
            a.remove(); // Eliminar el enlace del DOM después de la descarga
       
            // Liberar la URL temporal
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error al descargar el archivo:', error);
        });
      };

      useEffect(()=>{
        console.log(props.showAttendances)
        if(props.showAttendances === true){
            container.current.style.display = "flex"
        }else{
            container.current.style.display = "none"
    
        }
    },[props.showAttendances])
    
    
    return(
<div>
<div ref={container} className={styles.container}>
 <button className={styles.exitSVG} src={exitSVG} onClick={()=>{
        container.current.style.display = "none"
        props.setShowAttendances(false)
    }}>X</button>
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

        <button type="submit" className={styles.button}>Consultar</button>
        <p ref={correctText} className={styles.correct}></p>
      </form>
    </div>
    </div>
</div>
    )
}

export default GetAttendances