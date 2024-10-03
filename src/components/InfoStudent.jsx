import { Link } from "react-router-dom"
import InfoStudentStyles from "../styles/infostudent.module.css"
import EditSvg from "../assets/pen-svgrepo-com (1).svg"


const InfoStudent = (props)=>{
    return(
<Link to={`/student/group/${props.idgroup}/${props.id}/${props.grade}/${props.group}/${props.area}`} className={InfoStudentStyles.container}>

<p>{props.lastName}</p>

    

<p>{props.firstName}</p>


<p>{props.email}</p>



</Link>
    )
}

export default InfoStudent