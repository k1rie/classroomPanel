import { useParams } from "react-router-dom"
import Styles from "../styles/ExportAllDataGroup.module.css"
import { BASE_API_URL } from "../api";
import { Button } from "@mui/material";

const ExportAllDataGroup = ()=>{

    const {id} = useParams()

    function exportResume(){
        const credentials = btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`);
        fetch(`https://smartclass-backend.onrender.com/getResume/${id}`,{
            headers:{
                'Authorization': `Basic ${credentials}`,
                "Content-Type":"application/json"
            }
        }).then(response => response.blob())  // Convertir a Blob
        .then(blob => {
            // Crear una URL temporal para descargar el archivo
            const url = window.URL.createObjectURL(new Blob([blob]));
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Resumen.xlsx';  // Nombre del archivo descargado
            document.body.appendChild(a);
            a.click();  // Hacer click en el enlace
            a.remove(); // Remover el enlace después de descargar
        })
    }

    
    function exportCalifications(){
        const credentials = btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`);
        fetch(`${BASE_API_URL}/getCalifications/${id}`,{
            headers:{
                'Authorization': `Basic ${credentials}`,
                "Content-Type":"application/json"
            }
        }).then(response => response.blob())  // Convertir a Blob
        .then(blob => {
            // Crear una URL temporal para descargar el archivo
            const url = window.URL.createObjectURL(new Blob([blob]));
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Calificaciones.xlsx';  // Nombre del archivo descargado
            document.body.appendChild(a);
            a.click();  // Hacer click en el enlace
            a.remove(); // Remover el enlace después de descargar
        })
    }

    return(
<Button variant="outlined" onClick={()=>{
    exportResume()
    exportCalifications()
}}>
Obtener Resumen
</Button>
    )
}

export default ExportAllDataGroup