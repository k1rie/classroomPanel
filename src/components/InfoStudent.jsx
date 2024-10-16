import { Link } from "react-router-dom"
import InfoStudentStyles from "../styles/infostudent.module.css"
import EditSvg from "../assets/pen-svgrepo-com (1).svg"


const InfoStudent = (props)=>{
    return(
<Link to={`/student/group/${props.idgroup}/${props.id}`} className={InfoStudentStyles.container}>

<p>{props.lista}</p>


<p>{props.lastName}</p>

    

<p>{props.firstName}</p>


<p className={InfoStudentStyles.email}>{props.email}</p>



</Link>
    )
}

export default InfoStudent