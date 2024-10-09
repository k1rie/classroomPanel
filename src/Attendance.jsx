import { useParams } from "react-router-dom"
import Navbar from "./components/Navbar"
import attendanceStyles from "./styles/attendance.module.css"
import { useEffect } from "react"
<<<<<<< HEAD

const Attendance = ()=>{

    const {lastname,name,grade,group,area,email} = useParams()

    const attendance = ()=>{
        fetch(`https://tasksflow-backend.onrender.com/attendance/${name}/${lastname}/${grade}/${group}/${area}/${email}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
          
        })
=======
import correctSVG from "./assets/check-circle-svgrepo-com.svg"

const Attendance = ()=>{

    const {lastName,name,grade,group,area,email} = useParams()

    const attendance = ()=>{
        console.log(lastName)
        const credentials = btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`);
        fetch(`https://tasksflow-backend.onrender.com/attendance/${name}/${lastName}/${grade}/${group}/${area}/${email}`,{
            method: "POST",
            headers: {
                'Authorization': `Basic ${credentials}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                emailUser: localStorage.getItem("email")
            })
          
        }).then(data=>data.json()).then(data=>console.log(data))
>>>>>>> 0162885 (permisos)
    }

    useEffect(()=>{
        attendance()
    },[])

    return(
        <div className={attendanceStyles.container}>

        <Navbar/>
<div className={attendanceStyles.content}>
<p>Alumno: {name} {lastName}</p>
<p>{grade} {group} {area}</p>
<img className={attendanceStyles.correctSVG}src={correctSVG}/>
</div>
</div>

    )
}

export default Attendance
