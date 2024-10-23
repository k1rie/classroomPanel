import { useParams } from "react-router-dom"
import Navbar from "./components/Navbar"
import attendanceStyles from "./styles/attendance.module.css"
import { useEffect, useRef, useState } from "react"
import correctSVG from "./assets/check-circle-svgrepo-com.svg"
import notCorrectSVG from "./assets/no-alt-svgrepo-com.svg"
import { BASE_API_URL } from "./api"

const Attendance = ()=>{

    const {id,lastName,name,grade,group,area,email} = useParams()
    const [response,setResponse] = useState(false)
    const [student,setStudent] = useState({nombre:""})

    const correctSVGHTML = useRef()
    const notCorrectSVGHTML = useRef()

    const getStudent = ()=>{
        const credentials = btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`);
        fetch(`${BASE_API_URL}/getStudent/${id}`,{
            headers:{
                'Authorization': `Basic ${credentials}`,
                "Content-Type": "application/json"
            }
        }).then(data=>data.json()).then(data=>
            setStudent(data[0])
        )
    }

    const attendance = ()=>{
        console.log(lastName)
        const credentials = btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`);
        fetch(`${BASE_API_URL}/attendance`,{
            method: "POST",
            headers: {
                'Authorization': `Basic ${credentials}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name:name,
                lastName:lastName,
                grade:grade,
                group:group,
                area: area,
                id:id,
                emailUser: localStorage.getItem("email")
            })
          
        }).then(data=>data.json()).then(data=>setResponse(data.response))
    }

    useEffect(()=>{
        attendance()
        getStudent()
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
<p>Alumno: {student.nombre} {student.apellidos}</p>
<p>{student.grado} {student.grupo} {student.especialidad}</p>
<img ref={correctSVGHTML} className={attendanceStyles.correctSVG}src={correctSVG}/>
<img ref={notCorrectSVGHTML} className={attendanceStyles.notCorrectSVG} src={notCorrectSVG}/>
</div>
</div>

    )
}

export default Attendance