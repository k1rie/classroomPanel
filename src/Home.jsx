import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HomeStyles from './styles/home.module.css'
import NavBar from './components/Navbar'
import GroupCard from './components/GroupCard'
import ArrowRightSvg from "./assets/arrow-sm-right-svgrepo-com.svg"
import ArrowLeftSvg from "./assets/arrow-sm-left-svgrepo-com.svg"
import Form  from './components/Form.jsx'
import LoginForm from './components/LoginForm.jsx'

function App(props) {


  const [groups,setGroups] = useState([])
  const [clicks,setClicks] = useState(0)
  const [direction,setDirection] = useState()
  const [width,setWidth] = useState([])
  const [form,setForm] = useState()
  const [newGroup,setNewGroup] = useState({
 })
  const groupsContainer = useRef(null)
  const card = useRef()

  function addWidth(width){
console.log(width)
setWidth(width)
  }


  async function getGroups (){
    const credentials = btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`);
    await fetch("https://tasksflow-backend.onrender.com/getClassrooms",{
      headers:{
        'Authorization': `Basic ${credentials}`,
        "Content-Type": "application/json"
      }
    })
    .then(data=>data.json()).then(data=>{

        console.log("aaa")
 
        setGroups(data)  
      
    
    })
   

  }

  function moveRight(){
    console.log(clicks)
if(groupsContainer.current !== null && groups.length > clicks && clicks > 0){
  groupsContainer.current.style.marginLeft = `-${(width*clicks)}px`

}
if(clicks === 0){
  groupsContainer.current.style.marginLeft = `-${(width*clicks)}px`

}


   }

   function moveLeft(){
    console.log(clicks)
    if(groupsContainer.current !== null && clicks > 0){
      groupsContainer.current.style.marginLeft = `-${(width*clicks)}px`
      
    }
    if(clicks === 0){
      groupsContainer.current.style.marginLeft = `-${(width*clicks)}px`
    
    }


    console.log(clicks)
   }

   function addForm(form){
    setForm(form)
console.log(form)
   }

   function showCreateGroupForm(){
form.style.display ="flex"
   }



    function addGroup(group){

setGroups(
[...groups,{
  grado: group.grado,
  grupo: group.grupo,
  especialidad: group.especialidad,
  alumnos: 0,
  id: group.idGroup
}]
)
console.log(`insertid: ${group.idGroup}`)
   }

  
   useEffect(()=>{
    getGroups()
   },[])
   
   useEffect(()=>{
if(direction === "Right"){
  moveRight()
}else{
  moveLeft()
}
   },[clicks,direction])
   

   



  
  
  return(
    <div className={HomeStyles.container}>
    {
    localStorage.getItem("email") ? (
       console.log("n")
    ) : (
      <LoginForm/>
    )
    }
      <Form target="groups" input1Type="number" input1="Grado" input2="Grupo" input3="Especialidad" addGroup={addGroup} addForm ={addForm}/>
    <NavBar/>
    <div className={HomeStyles.homeContainer}>
    <h1 >e-Tareas</h1>
    <div className={HomeStyles.groupsContainer}>
    <p className={HomeStyles.groupsTittle}>Grupos</p>
<div className={HomeStyles.groupsCardsContainer}>
<button className={HomeStyles.groupsCreate} onClick={showCreateGroupForm}>Crear Grupo</button>

  <div ref={groupsContainer} className={HomeStyles.groups}>
{groups.map( (e)=>{
  
  return <GroupCard link={`/group/${e.id}`} info="Alumnos" addWidth={addWidth} getCardWidth={(width)=>getCardWidth(width)} students={e.alumnos} area={e.especialidad} grade={e.grado} group={e.grupo}/>


}
   )}

</div>
</div>

<div className={`${HomeStyles.arrowSvgContainer} ${HomeStyles.arrowLeftContainer}`} onClick={()=>
  {
    setDirection("Left")
 if(clicks > 0){
  setClicks(clicks-1)}
 }
}
  >
<img className={HomeStyles.arrowSvg} src={ArrowLeftSvg}/>
</div >

<div className={HomeStyles.arrowSvgContainer} onClick={()=>
  {
    setDirection("Right")
  if(clicks < groups.length-1){
    setClicks(clicks+1)
  }
}

}
  >
<img className={HomeStyles.arrowSvg} src={ArrowRightSvg}/>
</div >
    </div>
    </div>
    </div>
  )
}

export default App
