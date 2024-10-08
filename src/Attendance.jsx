import { useParams } from "react-router-dom"
import Navbar from "./components/Navbar"
import attendanceStyles from "./styles/attendance.module.css"

const Attendance = ()=>{

    const {lastname,name,grade,group,area} = useParams()

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