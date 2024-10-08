import infoTaskStyle from "../styles/infotask.module.css"
import editSvg from "../assets/pen-svgrepo-com (1).svg"
import trashSvg from "../assets/trash-bin-trash-svgrepo-com.svg"
import { useRef, useState } from "react"
import { useParams } from "react-router-dom"


const InfoTask = (props)=>{

    const {grade,group,area} = useParams()

    const [newNameTask,setNewNameTask] = useState()

    const [newRateTask,setNewRateTask] = useState()

    const container = useRef()


    const input1 = useRef()
    const input2 = useRef()
    const text1 = useRef()
    const text2 = useRef()

    async function changeNameTask(){
        console.log(props.id)
        await fetch("https://tasksflow-backend.onrender.com/changeNameTask",{
            method:"PATCH",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                alumnosTask: props.students,
                newTaskName: newNameTask,
                nameTask: props.name,
                idTask: props.id,
                emailUser: localStorage.getItem("email"),
                password: localStorage.getItem("password")
            })
        })
         input1.current.style.display ="none"
            text1.current.style.display ="block"
            text1.current.textContent = newNameTask
    }

    async function changeRateTaskGroup(){
        console.log(props.id)
        await fetch("https://tasksflow-backend.onrender.com/changeRateTaskGroup",{
            method:"PATCH",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                grade: grade,
                group: group,
                area: area,
                rate: props.rate,
                alumnosTask: props.students,
                newRate: newRateTask,
                nameTask: props.name,
                idTask: props.id,
                emailUser: localStorage.getItem("email"),
                password: localStorage.getItem("password")
            })
        })
        console.log(newRateTask)
         input2.current.style.display ="none"
            text2.current.style.display ="block"
            text2.current.textContent = newRateTask
    }

   async function deleteTask(){
        await fetch("https://tasksflow-backend.onrender.com/deleteTask",{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                alumnosTask: props.students,
               id: props.id,
               nameTask: props.name,
               grade: props.grade,
               group: props.group,
               area: props.area,
               emailUser: localStorage.getItem("email"),
               password: localStorage.getItem("password")
            })
        }).then(data=>container.current.style.display = "none")
    }




return(
    <div ref={container} className={infoTaskStyle.task}> 

    <div className={infoTaskStyle.infoTaskContainer}>
            <input ref={input1} className={infoTaskStyle.input} type="text" onKeyUp={(e)=>{
                if(e.key === "Enter"){
                        changeNameTask()
                }
            }} onChange={(e)=>{
     
                setNewNameTask(e.target.value)
            }}/>
        <p ref={text1}>{props.name}</p>  
        <img className={infoTaskStyle.editSvg} src={editSvg} onClick={(e)=>{
input1.current.value = props.name
            input1.current.style.display ="block"
            text1.current.style.display ="none"
        }}/>
        
        <div/> 
        
        </div>
        
        <div className={infoTaskStyle.infoTaskContainer}> 
        <input ref={input2} className={infoTaskStyle.input} type="number" onKeyUp={(e)=>{
                if(e.key === "Enter"){
                        changeRateTaskGroup()
                }
            }} onChange={(e)=>{
            
                setNewRateTask(e.target.value)
            }}/>
            <p ref={text2} >{props.rate}</p>   
            <img className={infoTaskStyle.editSvg} src={editSvg} onClick={(e)=>{
                input2.current.value = props.rate
input2.current.style.display ="block"
text2.current.style.display ="none"
}}/> 
        
        <img className={infoTaskStyle.editSvg} src={trashSvg} onClick={(e)=>{
deleteTask()
}}/> 
        
 
        </div>

    </div>
)
}

export default InfoTask