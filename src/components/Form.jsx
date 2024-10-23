import { useParams } from "react-router-dom"
import FormStyles from "../styles/form.module.css"
import { useRef,useEffect, useState } from "react"
import { BASE_API_URL } from "../api"

const Form = (props)=>{

    const [input1,setInput1] = useState("")
    const [input2,setInput2] = useState("")
    const [input3,setInput3] = useState("")
    const [groupData,setGroupData] = useState([{"insertId": ""}])
    const {grade,group,area,} = useParams()
    const refInput1 = useRef()
    const refInput2 = useRef()
    const refInput3 = useRef()
    const form = useRef()


const getForm= ()=>{
    props.addForm(form.current)

}

const getInfo= ()=>{
   

  if(props.addStudent && props.target === "students"){
    props.addStudent({
        nombre: input1,
        apellidos: input2,
        grupo: group,
        grado: grade,
        especialidad: area,
        correo: input3
        
    })
  }

  if(props.addTask && props.target === "tasks"){
    console.log("hiii")
    props.addTask({
        grade: grade,
        group: group,
        area: area,
        nombre: input1,
        name: input1,
        rate: Number(input2),
        finalRate: Number(input3),
        final_rate: Number(input3),
        alumnosTask: props.students,
        emailUser: localStorage.getItem("email"),
        password: localStorage.getItem("password")
    })
  }

  if(props.getGroup && props.target === "updateGroup"){
    props.getGroup({
        grade: input1,
        group: input2,
        area: input3,
        students: props.students
    })
  }
}


async function createGroup (){
    console.log("aaaaaaa")
if(props.addGroup && props.target === "groups"){
    console.log("eeeeeeeeeeee")
    console.log("2aaa")
    await fetch(BASE_API_URL + "/createClassroom", {
        method: "POST",
        headers: {
             "Content-Type": "application/json",
        },
        body: JSON.stringify({
            especialidad: input3,
            grado:input1,
            grupo: input2,
            emailUser: localStorage.getItem("email"),
            password: localStorage.getItem("password")
        })
    }).then((response) => { return response.json() }).then((response) => {
        if(props.addGroup && props.target === "groups"){

            props.addGroup({
                grado: input1,
                grupo: input2,
                especialidad: input3,
                alumnos: 0,
                idGroup: response[0].insertId,
                emailUser: localStorage.getItem("email"),
                password: localStorage.getItem("password")
            })
          }
          
  
      
 
    })
}

}


useEffect(()=>{

    getForm()
    
},[])

useEffect(()=>{
 
  if(props.studentData){
    console.log(props.studentData)
    refInput1.current.value = props.studentData.nombre
    setInput1(refInput1.current.value)
    refInput2.current.value = props.studentData.apellidos
    setInput2(refInput2.current.value)
    refInput3.current.value = props.studentData.correo
    setInput3(refInput3.current.value)
  }

},[props.studentData])

    return(
        <>
<div ref={form} className={FormStyles.formContainer}>
  <div className={FormStyles.form}>
    <button
      className={FormStyles.quitButton}
      onClick={() => {
        form.current.style.display = "none";
      }}
    >
      &times;
    </button>
    <div className={FormStyles.flex}>
      <label>
        <input
        ref={refInput1}
          required
          placeholder=" "
          type={props.input1Type}
          className={FormStyles.input}
          onChange={(e) => {
            setInput1(e.currentTarget.value);
          }}
        />
        <span>{props.input1}</span>
      </label>
      <label>
        <input
        ref={refInput2}
        
          required
          placeholder=" "
          type="text"
          className={FormStyles.input}
          onChange={(e) => {
            setInput2(e.currentTarget.value);
          }}
        />
        <span>{props.input2}</span>
      </label>
    </div>
    <label>
      <input
      ref={refInput3}
     
        required
        placeholder=" "
        type="text"
        className={FormStyles.input}
        onChange={(e) => {
          setInput3(e.currentTarget.value);
        }}
      />
      <span>{props.input3}</span>
    </label>
    <button
      className={FormStyles.fancy}
      onClick={() => {
        createGroup();
        getInfo();
        form.current.style.display = "none";
      }}
    >
      Añadir
    </button>
  </div>
</div>
        </>

    )
}

export default Form