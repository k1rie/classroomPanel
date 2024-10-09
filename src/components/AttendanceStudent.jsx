import { useParams } from "react-router-dom"
import AttendanceStudentStyles from "../styles/attendancestudent.module.css"
import { useEffect, useRef, useState } from "react"
import checkSVG from "../assets/check-svgrepo-com.svg"
import notCheckSVG from "../assets/no-alt-svgrepo-com.svg"
import exitSVG from "../assets/exit-svgrepo-com.svg"

const AttendanceStudent = (props)=>{


    const [attendances,setAtendances] = useState([])
    const {grade,group,area} = useParams()
    const container = useRef()
    const [permissions,setPermissions] = useState([])

    const getAttendance = ()=>{
   
        console.log(props)
        const credentials = btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`);
        fetch(`https://tasksflow-backend.onrender.com/getStudentAttendance/${props.name}/${props.lastName}/${grade}/${group}/${area}`,{
       headers:{
          'Authorization': `Basic ${credentials}`,
                    "Content-Type":"application/json"
       }
    }).then(data=>data.json()).then(data=>setAtendances(data))

}

const getPermissions= ()=>{
   
    console.log(props)
    const credentials = btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`);
    fetch(`https://tasksflow-backend.onrender.com/getPermissions/${props.name}/${props.lastName}/${grade}/${group}/${area}`,{
   headers:{
      'Authorization': `Basic ${credentials}`,
                "Content-Type":"application/json"
   }
}).then(data=>data.json()).then(data=>    setPermissions(data))

}


useEffect(()=>{
    console.log(props.showAttendances)
    if(props.showAttendances === true){
        container.current.style.display = "flex"
    }else{
        container.current.style.display = "none"

    }
},[props.showAttendances])



useEffect(()=>{
    getAttendance()
    getPermissions()
},[props.name,props.lastName])
    return(
<div className={AttendanceStudentStyles.container} ref={container}>
    <img className={AttendanceStudentStyles.exitSVG} src={exitSVG} onClick={()=>{
        container.current.style.display = "none"
        props.showAttendancesSet(false)
    }}/>
<div className={AttendanceStudentStyles.attendanceContainer}>


<div className={AttendanceStudentStyles.headerContainer}>
    <p>Asistio</p>
    <p>Fecha</p>

</div>

<div className={AttendanceStudentStyles.attendances}>
<div className={AttendanceStudentStyles.atendance}>
{attendances.map((e)=>{
    if(e.attendance        === 1){
        return   <> <img className={AttendanceStudentStyles.atendanceStatusImg} src={checkSVG}/> <p className={AttendanceStudentStyles.infoText}>{e.created_at}</p></>
    }else{
        return   <> <img className={AttendanceStudentStyles.atendanceStatusImg} src={notCheckSVG}/> <p className={AttendanceStudentStyles.infoText}>{e.created_at}</p></>

    }
})}
</div>
</div>

<div className={AttendanceStudentStyles.headerContainerPermissions}>
    <p>Permiso</p>
    <p>Razon</p>
<p>Fecha</p>
</div>
<div className={AttendanceStudentStyles.permissions}>
<div className={AttendanceStudentStyles.permission}>
{permissions.map((e)=>{
    if(e.permission === 1){
        return   <> <img className={AttendanceStudentStyles.atendanceStatusImg} src={checkSVG}/> <p>{e.reason}</p> <p className={AttendanceStudentStyles.infoText}>{e.created_at}</p></>
    }
})}
</div>
</div>

</div>
</div>
    )
}

export default AttendanceStudent