import { useEffect, useRef, useState } from "react"
import ConfirmDeleteStyles from "../styles/confirmdelete.module.css"
import { useParams } from "react-router-dom"


const ConfirmDelete = (props)=>{

    const element = useRef()

    const [confirm,setConfirm] = useState(false)

    const {grade,group,area} = useParams()

    function showConfirmDelete(){
props.addConfirmDelete(element.current)

    }

    

    useEffect(()=>{
        props.confirmDeleteState(confirm)
    },[confirm])

  

    useEffect(()=>{
showConfirmDelete()
    },[])

    return(
        <div ref={element} className={ConfirmDeleteStyles.container}>
<div className={ConfirmDeleteStyles.optionsContainer}>
<p className={ConfirmDeleteStyles.advise}>¿Estas seguro que quieres eliminar este grupo?</p>
<button onClick={()=>{setConfirm(true)}}>Eliminar</button>
<p className={ConfirmDeleteStyles.cancel} onClick={()=>{element.current.style.display="none"}}>Cancelar</p>
</div>
        </div>
    )
}

export default ConfirmDelete