import { useParams } from "react-router-dom"
import ExportDataGroupStyles from "../styles/exportdatagroup.module.css"
import { BASE_API_URL } from "../api";

const ExportDataGroup = (props)=>{

    const {id} = useParams()

    function exportData(){
        const credentials = btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`);
        fetch(`${BASE_API_URL}/getDataList/${id}/${props.grado}/${props.grupo}/${props.especialidad}`,{
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
            a.download = 'reporte.xlsx';  // Nombre del archivo descargado
            document.body.appendChild(a);
            a.click();  // Hacer click en el enlace
            a.remove(); // Remover el enlace después de descargar
        })
    }

    return(
<button className={ExportDataGroupStyles.buttonExport} onClick={exportData}>
Exportar Calificaciones
</button>
    )
}

export default ExportDataGroup