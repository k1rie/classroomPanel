import GroupCard from "./components/GroupCard"
import NavBar from "./components/Navbar"
import GroupStyles from "./styles/group.module.css"
import InfoStudent from "./components/InfoStudent"
import Form from "./components/Form.jsx"
import { useState,useEffect } from "react"
import {useParams, useNavigate } from "react-router-dom"
import ConfirmDelete from "./components/ConfirmDelete.jsx"
import InfoTask from "./components/InfoTask.jsx"
import ExportDataGroup from "./components/ExportDataGroup.jsx"

const Group = ()=>{

    const navigate = useNavigate()

    const {id,area,grade,group} = useParams()

    const [students,setStudents] = useState([])

    const [student,setStudent] = useState([])

    const [form,setForm] = useState([])

    const [form2,setForm2] = useState([])


    const [tasks,setTasks] = useState([])
    const [task,setTask] = useState([])
    const [confirmDelete,setConfirmDelete] = useState([])
    const [form3,setForm3] = useState([])
    const [groupData,setGroupData] = useState({})
    

    

  
    async function addTaskDB(){
        if(students.length !== 0){
         console.log("studentaaa")
         console.log(student)
         setTasks([...tasks,task])
         console.log("aaatasks")
         console.log(tasks)
        await fetch("https://tasksflow-backend.onrender.com/createTask",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task)
        }).then(data=>data.json()).then(data=>console.log(data))
        }
        
        }

    function showCreateTask(){
        form2.style.display ="flex"
           }

           function addTask(task){
            setTask(task)
            console.log("xfff")

        console.log(task)
           }

           function addForm2(form){
            setForm2(form)
           }

           function getTasksGroup(){
            fetch(`https://tasksflow-backend.onrender.com/getTasksGroup/${grade}/${group}/${area}`).then(data=>data.json()).then(data=>{
                console.log(data)
                setTasks(data)
            }
            )
        }
    
    

           useEffect(()=>{
            console.log(task)
            addTaskDB()
            
        },[task])


    useEffect(()=>{
        getStudents()

    },[])

    


    function addForm(form){
        setForm(form)
    console.log(form)
       }

       function addStudent(student){
        setStudent(student)
    console.log(student)
       }

       
       async function addStudentDB(){
       if(student.length !== 0){
        console.log("studentaaa")
        console.log(student)
        const data = await fetch("https://tasksflow-backend.onrender.com/createStudent",{
            method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(student)
           }).then(data=>data.json())
       

        
           setStudents([...students,{
            nombre: student.nombre,
            apellidos: student.apellidos,
            grupo: group,
            grado: grade,
            especialidad: area,
            correo: student.correo,
            id:data.insertId
           }])

       }
       
       }

       function showCreateStudentForm(){
        form.style.display ="flex"
           }
    
           function showCreateGroup(){
            form3.style.display ="flex"
               }


    function getStudents() {
        fetch(`https://tasksflow-backend.onrender.com/getStudents/${area}/${grade}/${group}`).then(data=>data.json())
        .then((data)=>{setStudents(data)}).then(data=> {console.log(data)}
    )
    }

    function addConfirmDelete (element){
        setConfirmDelete(element)
    }

    async function confirmDeleteState(confirm){
        if(confirm === true){
           await fetch(`https://tasksflow-backend.onrender.com/deleteClassroom/${Number(id)}`,{
                method: "DELETE"
            })
            navigate("/")

        }
    }

    function confirmDeleteShow(){
        confirmDelete.style.display = "flex"
    }

  
    useEffect(()=>{
        getTasksGroup()
        getStudents()
    },[])

    useEffect(()=>{
        console.log(student)
        addStudentDB()
    },[student])


    function addForm3(form){
        setForm3(form)
       }

       function getGroup(group){
        console.log(group)
        setGroupData(group)
    console.log(student)
       }

       function editGroup(){
        if(groupData.length > 0){
        fetch("https://tasksflow-backend.onrender.com/updateGroup",{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
{
    newGrade: Number(groupData.grade),
    newGroup: groupData.group,
    newArea: groupData.area,
    students: students,
    grade: Number(grade),
    group: group,
    area: area,
    id:id
}
            )
        })
    }
       }

       
    useEffect(()=>{
        console.log(student)
        editGroup()
    },[groupData])
return(
    <div className={GroupStyles.container}>
<ConfirmDelete addConfirmDelete={addConfirmDelete} confirmDeleteState={confirmDeleteState}/>
<Form target="updateGroup" students={students} input1Type="text" input1="Grado" input2="Grupo" input3="Especialidad" getGroup ={getGroup}  addForm ={addForm3}/>

<NavBar/>

<div className={GroupStyles.groupContainer}>
<div className={GroupStyles.topContainer}>
<div className={GroupStyles.optionsStudentContainer}>

    <button className={GroupStyles.deleteGroup} onClick={confirmDeleteShow}>Eliminar Grupo</button>
    <button className={GroupStyles.editGroup} onClick={showCreateGroup}>Editar Grupo</button>
    <ExportDataGroup/>
</div>
    <div className={GroupStyles.groupInfo}>
<GroupCard  students={`${grade} ${group}`} area={area} grade={grade} group={group}/>
</div>
</div>

<div className={GroupStyles.tasksContainer}>
<button className={GroupStyles.taskButtonAdd} onClick={showCreateTask}>Crear Tarea</button>

<Form target="tasks" students={students} input1Type="text" input1="Nombre" input2="Valor" input3="Calificación Final" addTask ={addTask}  addForm ={addForm2}/>

<div className={GroupStyles.taskInfo}>


<div className={GroupStyles.taskInfoTextContainer}>

<p className={GroupStyles.taskInfoText}>Tarea</p>
</div>


<div className={GroupStyles.taskInfoTextContainer}>
<p className={GroupStyles.taskInfoText}>Valor</p>
</div>

</div>
<div className={GroupStyles.tasks}>

{tasks.map((e)=>{
    return <InfoTask grade={grade} group={group} area={area} id={e.id} students={students} rate={e.rate} name={e.name}/>
})}



</div>
</div>

<div className={GroupStyles.studentsContainer}>
<p className={GroupStyles.addStudentButton} onClick={showCreateStudentForm}>Añadir Alumno</p>
<Form key={2} target="students" input1Type="text" input1="Nombre" input2="Apellidos" input3="Email" addStudent ={addStudent}  addForm ={addForm}/>
<div className={GroupStyles.studentsInfoContainer}>

<div className={GroupStyles.studentsSection}>
<p className={GroupStyles.info}>Lista</p>
</div>

<div className={GroupStyles.studentsSection}>
<p className={GroupStyles.info}>Apellidos</p>
</div>


<div className={GroupStyles.studentsSection}>
<p className={GroupStyles.info}>Nombre (s)</p>
</div>


<div className={GroupStyles.studentsSection}>
<p className={GroupStyles.info}>Correo</p>
</div>

</div>
<div className={GroupStyles.students}>
{students.map((e,index)=>{
    return (<InfoStudent lista ={index+1} idgroup={id} area={area} grade={grade} group={group} id={e.id} lastName={e.apellidos} firstName ={e.nombre} email={e.correo}/>)
    
})}
</div>

</div>
</div>
    </div>
)
}


export default Group