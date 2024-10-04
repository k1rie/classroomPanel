import { useNavigate, useParams } from "react-router-dom"
import Form from "./components/Form.jsx"
import GroupCard from "./components/GroupCard"
import NavBar from "./components/Navbar"
import StudentStyles from "./styles/student.module.css"
import { useEffect, useState } from "react"
import ConfirmDelete from "./components/ConfirmDelete.jsx"


const Student = ()=>{

    const navigate = useNavigate()

    const {idgroup,id,group,grade,area} = useParams()

    const [student,setStudent] = useState({})

    const [students,setStudents] = useState({})

    const [studentData,setStudentData] = useState([])


    const [task,setTask] = useState([])

    const [tasks,setTasks] = useState([])

    const [form2,setForm2] = useState([])   
     const [form,setForm] = useState([])

     const [newRate,setNewRate] = useState(0)

     const [taskName,setTaskName] = useState("")


    const [confirmDelete,setConfirmDelete] = useState([])

    
    
    function addStudent(student){
        setStudentData(student)
    console.log(student)
       }

       
       async function addStudentDB(){
        console.log(studentData)
       if(studentData.length !== 0){
        console.log("aqui")

        console.log(studentData)
        const data = await fetch(`https://tasksflow-backend.onrender.com/updateStudent/${id}`,{
            method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre: studentData.nombre,
                    apellidos: studentData.apellidos,
                    correo: studentData.correo
                })
           }).then(data=>data.json())
       
navigate(0)
        
      

       }
       
       }
       useEffect(()=>{
        console.log(studentData)
        addStudentDB()
    },[studentData])

    
    async function addTaskDB(){
        if(student.length !== 0){
         console.log("studentaaa")
         console.log(student)
         setTasks([...tasks,task])
         
        await fetch("https://tasksflow-backend.onrender.com/createTask",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task)
        }).then(data=>data.json()).then(data=>console.log(data))
        }
        
        }

    function getStudentInfo (){
        fetch(`https://tasksflow-backend.onrender.com/getStudent/${id}`).then(data=>data.json()).then(data=>
            setStudent(data[0])
        )
    }

    function getTasks(){
        fetch(`https://tasksflow-backend.onrender.com/getTasks/${Number(id)}`).then(data=>data.json()).then(data=>
            setTasks(data)
        )
    }

    function showCreateTask(){
        form.style.display ="flex"
           }
           function showCreateTask2(){
            form2.style.display ="flex"
               }

           function addTask(task){
            setTask(task)
        console.log(task)
           }

           function addForm(form){
            setForm(form)
           }

           
           function addForm2(form){
            setForm2(form)
           }

           function getStudents() {
            fetch(`https://tasksflow-backend.onrender.com/getStudents/${area}/${grade}/${group}`).then(data=>data.json())
            .then((data)=>{setStudents(data)}).then(data=> {console.log(data)}
        )
        }
    

           useEffect(()=>{
            console.log(task)
            addTaskDB()
            
        },[task])

        function addConfirmDelete (element){
            setConfirmDelete(element)
        }

        async function confirmDeleteState(confirm){
            console.log("haaa")
            if(confirm === true){
                console.log("iiiaaa")
               await fetch(`https://tasksflow-backend.onrender.com/deleteStudent/${Number(id)}`,{
                    method: "DELETE"
                })
                navigate(`/group/${id}/${area}/${grade}/${group}`)
    
            }
        }


        function confirmDeleteShow(){
            confirmDelete.style.display = "flex"
        }


        async function changeFinalRate(){
            console.log("aaa")
            await fetch(`https://tasksflow-backend.onrender.com/changeRateTask`,{
                method: "PATCH",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    newRate:Number(newRate),
                    idStudent: Number(id),
                    taskName: taskName
                })
            })
           
            console.log(newRate)
            navigate(0)
        }

      

    useEffect(()=>{
        getStudents()
getStudentInfo()
getTasks()
    },[])

    return(
        <div className={StudentStyles.container}>
            <ConfirmDelete  addConfirmDelete={addConfirmDelete} confirmDeleteState={confirmDeleteState}/>
            <Form studentData={student} target="students" students={students} input1Type="text" input1="Nombre" input2="Apellidos" input3="Correo" addStudent ={addStudent}  addForm ={addForm2}/>

            <NavBar/>
            <div className={StudentStyles.studentContainer}>
            <div className={StudentStyles.optionsStudentContainer}>

            <button className={StudentStyles.deleteStudent} onClick={confirmDeleteShow}>Eliminar Alumno</button>
            <button className={StudentStyles.editStudent} onClick={showCreateTask2}>Editar Alumno</button>
            </div>

<div className={StudentStyles.studentCardsContainer}>
<GroupCard students={`${student.nombre}`} area={student.correo} group={student.apellidos} />
<GroupCard link={`/group/${id}/${area}/${grade}/${group}`} students={group} area={area} group={grade} />

</div>
<div className={StudentStyles.tasksContainer}>
<p className={StudentStyles.createTaskText} onClick={showCreateTask}>Crear Tarea</p>
<Form target="tasks" students={students} input1Type="text" input1="Nombre" input2="Valor" input3="Calificación Final" addTask ={addTask}  addForm ={addForm}/>

<div className={StudentStyles.taskInfo}>


<div className={StudentStyles.taskInfoTextContainer}>

<p className={StudentStyles.taskInfoText}>Tarea</p>
</div>

<div className={StudentStyles.taskInfoTextContainer}>
<p className={StudentStyles.taskInfoText}>Valor</p>
</div>

<div className={StudentStyles.taskInfoTextContainer}>
<p className={StudentStyles.taskInfoText}>Porcentaje</p>
</div>
<div className={StudentStyles.taskInfoTextContainer}>
<p className={StudentStyles.taskInfoText}>Calificación Final</p>
</div>

</div>
<div className={StudentStyles.tasks}>

{tasks.map((e)=>{
    return <><div className={StudentStyles.task}> <p>{e.name}</p> <p>{e.rate}</p> <input onChange={((eListener)=>{
        setTaskName(e.name)
        setNewRate((eListener.target.value*e.rate)/100)
    })} onKeyUp={(eListener)=>{
        if(eListener.key === "Enter"){
            
            changeFinalRate()
            console.log(newRate)

        }
    }} type="number"/> <p>{e.final_rate}</p> </div></>
})}



</div>
</div>

            </div>
            
        </div>
    )
}

export default Student