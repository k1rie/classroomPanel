import { useParams } from "react-router-dom"
import ExportDataGroupStyles from "../styles/exportdatagroup.module.css"

const ExportDataGroup = ()=>{

    const {grade,group,area} = useParams()

    function exportData(){
        const credentials = btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`);
        fetch(`https://tasksflow-backend.onrender.com/getDataList/${grade}/${group}/${area}`,{
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
Export Data
</button>
    )
}

export default ExportDataGroup