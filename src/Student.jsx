import { useNavigate, useParams } from "react-router-dom"
import Form from "./components/Form.jsx"
import GroupCard from "./components/GroupCard"
import NavBar from "./components/Navbar"
import StudentStyles from "./styles/student.module.css"
import { useEffect, useState } from "react"
import ConfirmDelete from "./components/ConfirmDelete.jsx"
import AttendanceStudent from "./components/attendanceStudent.jsx"
import CreatePermission from "./components/CreatePermission.jsx"
import CreateAttendance from "./components/CreateAttendance.jsx"
import TaskGradesTable from "./components/TaskGradesTable.jsx"


const Student = ()=>{

    const navigate = useNavigate()

    const {idgroup,id} = useParams()

    const [student,setStudent] = useState({nombre: "none"})

    const [students,setStudents] = useState({})

    const [studentData,setStudentData] = useState([])



    const [tasks,setTasks] = useState([])
    const [showAttendances,setShowAttendances] = useState(false)
    const [showCreatePermissions,setShowCreatePermissions] = useState(false)


    const [form2,setForm2] = useState([])   
     const [form,setForm] = useState([])

    const [confirmDelete,setConfirmDelete] = useState([])

    const [showCreateAttendance,setShowCreateAttendance] = useState()

    
    
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
                    correo: studentData.correo,
                    emailUser: localStorage.getItem("email"),
                    password: localStorage.getItem("password"),
                    groupId: idgroup
                })
           }).then(data=>data.json())
       
navigate(0)
        
      

       }
       
       }
       useEffect(()=>{
        console.log(studentData)
        addStudentDB()
    },[studentData])

    
    async function addTaskDB(task){
        if(student.length !== 0){
         console.log("studentaaa")
         console.log(student)
         setTasks([...tasks,task])
         
        await fetch("https://tasksflow-backend.onrender.com/createTask",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre: task.nombre,
                rate:task.rate,
                grade:task.grade,
                group:task.group,
                area: task.area,
                emailUser: localStorage.getItem("email"),
                password: localStorage.getItem("password"),
                alumnosTask: students,
                groupId: idgroup
            })
        }).then(data=>data.json()).then(data=>console.log(data))
        }
        
        }

    function getStudentInfo (){
        const credentials = btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`);
        fetch(`https://tasksflow-backend.onrender.com/getStudent/${id}`,{
            headers:{
                'Authorization': `Basic ${credentials}`,
                "Content-Type": "application/json"
            }
        }).then(data=>data.json()).then(data=>
            setStudent(data[0])
        )
    }

    function getTasks(){
        const credentials = btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`);
        fetch(`https://tasksflow-backend.onrender.com/getTasks/${Number(id)}`,{
            headers:{
                'Authorization': `Basic ${credentials}`,
                "Content-Type": "application/json"
            }
        }).then(data=>data.json()).then(data=>{
            if(data.length > 0){2
                console.log(tasks)
                setTasks(data)
            }
        }
        )
    }

    function showCreateTask(){
        form.style.display ="flex"
           }
           function showCreateTask2(){
            form2.style.display ="flex"
               }

           function addTask(task){
          
            addTaskDB(task)
        console.log(task)
           }

           function addForm(form){
            setForm(form)
           }

           
           function addForm2(form){
            setForm2(form)
           }

           function getStudents() {
            const credentials = btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`);
            fetch(`https://tasksflow-backend.onrender.com/getStudents/${idgroup}`,{
                headers:{
                    'Authorization': `Basic ${credentials}`,
                    "Content-Type":"application/json"
                }
            }).then(data=>data.json())
            .then((data)=>{setStudents(data)}).then(data=> {console.log(data)}
        )
        }
    

      
        function addConfirmDelete (element){
            setConfirmDelete(element)
        }

        async function confirmDeleteState(confirm){
            console.log("haaa")
            if(confirm === true){
                console.log("iiiaaa")
               await fetch(`https://tasksflow-backend.onrender.com/deleteStudent/${Number(id)}`,{
                    method: "DELETE",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        groupId: idgroup,
                        emailUser: localStorage.getItem("email"),
                        password: localStorage.getItem("password")
                    })
                })
                navigate(`/group/${idgroup}`)
    
            }
        }


        function confirmDeleteShow(){
            confirmDelete.style.display = "flex"
        }


       

    useEffect(()=>{
        getStudents()
getStudentInfo()
getTasks()
    },[])

    return(
        <div className={StudentStyles.container}>
            <CreateAttendance setShowCreateAttendance={setShowCreateAttendance} showCreateAttendance={showCreateAttendance} name={(student.nombre !== undefined && student.nombre)} lastName={student.apellidos}/>
            <CreatePermission setShowCreatePermissions={setShowCreatePermissions} showCreatePermissions={showCreatePermissions} name={student.nombre} lastName={student.apellidos}/>
            <AttendanceStudent showAttendancesSet={setShowAttendances} showAttendances={showAttendances} name={student.nombre} lastName={student.apellidos}/>
            <ConfirmDelete message="¿Estas seguro que quieres eliminar este alumno?"  addConfirmDelete={addConfirmDelete} confirmDeleteState={confirmDeleteState}/>
            <Form studentData={student} target="students" students={students} input1Type="text" input1="Nombre" input2="Apellidos" input3="Correo" addStudent ={addStudent}  addForm ={addForm2}/>

            <NavBar/>
            <div className={StudentStyles.studentContainer}>
            <div className={StudentStyles.optionsStudentContainer}>

            <button className={StudentStyles.deleteStudent} onClick={confirmDeleteShow}>Eliminar Alumno</button>
            <button className={StudentStyles.editStudent} onClick={showCreateTask2}>Editar Alumno</button>
            <button className={StudentStyles.attendanceStudent} onClick={()=>{
                setShowAttendances(true)
            }}>Asistencias</button>
                                    <button className={StudentStyles.attendanceStudent} 
                                    onClick={()=>{
                                        setShowCreatePermissions(true)
                                    }}>Generar Permiso</button>

<button className={StudentStyles.attendanceStudent} 
                                    onClick={()=>{
                                        setShowCreateAttendance(true)
                                    }}>Generar Asistencia</button>

            </div>
            

<div className={StudentStyles.studentCardsContainer}>
<GroupCard students={`${student.nombre}`} area={student.correo} group={student.apellidos} />
<GroupCard link={`/group/${idgroup}`} students={student.grupo} area={student.especialidad} group={student.grado} />

</div>
<div className={StudentStyles.tasksContainer}>
<button className={StudentStyles.taskButtonAdd} onClick={showCreateTask}>Crear Tarea</button>
<Form target="tasks" students={students} input1Type="text" input1="Nombre" input2="Valor" input3="Calificación Final" addTask ={addTask}  addForm ={addForm}/>



<TaskGradesTable tasksData={tasks} studentId={id} />


</div>


            </div>
            
        </div>
    )
}

export default Student