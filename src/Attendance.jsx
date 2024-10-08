import { useParams } from "react-router-dom"
import Navbar from "./components/Navbar"
import attendanceStyles from "./styles/attendance.module.css"
import { useEffect } from "react"

const Attendance = ()=>{

    const {lastname,name,grade,group,area,email} = useParams()

    const attendance = ()=>{
        fetch(`https://tasksflow-backend.onrender.com/attendance/${name}/${lastname}/${grade}/${group}/${area}/${email}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
          
        })
    }

    useEffect(()=>{
        attendance()
    },[])

    return(
        <div className={attendanceStyles.container}>

        <Navbar/>
<div className={attendanceStyles.content}>
<p>Alumno {name} {lastname}</p>
<p>{grade} {group} {area}</p>
</div>
</div>

    )
}

export default Attendance
