import { useParams } from "react-router-dom"
import AttendanceStudentStyles from "../styles/attendancestudent.module.css"
import { useEffect, useRef, useState } from "react"
import checkSVG from "../assets/check-svgrepo-com.svg"
import notCheckSVG from "../assets/no-alt-svgrepo-com.svg"
import exitSVG from "../assets/exit-svgrepo-com.svg"
import { BASE_API_URL } from "../api"

const AttendanceStudent = (props)=>{


    const [attendances,setAtendances] = useState([])
    const {id,grade,group,area} = useParams()
    const container = useRef()
    const [permissions,setPermissions] = useState([])

    const getAttendance = ()=>{
   
        console.log(props)
        const credentials = btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`);
        fetch(`${BASE_API_URL}/getStudentAttendance/${id}`,{
       headers:{
          'Authorization': `Basic ${credentials}`,
                    "Content-Type":"application/json"
       }
    }).then(data=>data.json()).then(data=>{
        if(data.length > 0){
            setAtendances(data)
        }
    })

}

const getPermissions= ()=>{
   
    console.log(props)
    const credentials = btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`);
    fetch(`${BASE_API_URL}/getPermissions/${id}`,{
   headers:{
      'Authorization': `Basic ${credentials}`,
                "Content-Type":"application/json"
   }
}).then(data=>data.json()).then(data=>    {
    console.log(data)

    if(data.length > 0){
        console.log(data)
        setPermissions(data)
    }
})

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
    <button className={AttendanceStudentStyles.exitSVG} src={exitSVG} onClick={()=>{
        container.current.style.display = "none"
        props.showAttendancesSet(false)
    }}>X</button>
<div className={AttendanceStudentStyles.attendanceContainer}>


<div className={AttendanceStudentStyles.headerContainer}>
    <p>Asistio</p>
    <p>Fecha</p>

</div>

<div className={AttendanceStudentStyles.attendances}>
<div className={AttendanceStudentStyles.atendance}>
{attendances.map((e)=>{
    if(e.attendance        === 1){
        return   <> <img className={AttendanceStudentStyles.atendanceStatusImg} src={checkSVG}/> <p className={AttendanceStudentStyles.infoText}>{e.date.slice(0, -14)}</p></>
    }else{
        return   <> <img className={AttendanceStudentStyles.atendanceStatusImg} src={notCheckSVG}/> <p className={AttendanceStudentStyles.infoText}>{e.date.slice(0, -14)}</p></>

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
        return   <> <img className={AttendanceStudentStyles.atendanceStatusImg} src={checkSVG}/> <p>{e.reason}</p> <p className={AttendanceStudentStyles.infoText}>{e.created_at.slice(0, -14)}</p></>
    }
})}
</div>
</div>

</div>
</div>
    )
}

export default AttendanceStudent