import { useParams } from "react-router-dom"
import Navbar from "./components/Navbar"
import attendanceStyles from "./styles/attendance.module.css"
import { useEffect, useRef, useState } from "react"
import correctSVG from "./assets/check-circle-svgrepo-com.svg"
import notCorrectSVG from "./assets/no-alt-svgrepo-com.svg"

const Attendance = ()=>{

    const {lastName,name,grade,group,area,email} = useParams()
    const [response,setResponse] = useState(false)

    const correctSVGHTML = useRef()
    const notCorrectSVGHTML = useRef()

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
          
        }).then(data=>data.json()).then(data=>setResponse(data.response))
    }

    useEffect(()=>{
        attendance()
    },[])

    useEffect(()=>{
if(response === true){
    correctSVGHTML.current.style.display = "block"
    notCorrectSVGHTML.current.style.display = "none"

}

if(response === false){
    correctSVGHTML.current.style.display = "none"

    notCorrectSVGHTML.current.style.display = "block"
}
    },[response])

    return(
        <div className={attendanceStyles.container}>

        <Navbar/>
<div className={attendanceStyles.content}>
<p>Alumno: {name} {lastName}</p>
<p>{grade} {group} {area}</p>
<img ref={correctSVGHTML} className={attendanceStyles.correctSVG}src={correctSVG}/>
<img ref={notCorrectSVGHTML} className={attendanceStyles.notCorrectSVG} src={notCorrectSVG}/>
</div>
</div>

    )
}

export default Attendance
