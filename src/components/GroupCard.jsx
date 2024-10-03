import React, { useEffect, useRef } from "react";
import GroupCardStyles from "../styles/groupcard.module.css"
import { Link } from "react-router-dom";

const GroupCard = (props)=>{

const width = useRef()


const getCardWidth = ()=>{
    props.addWidth(width.current.clientWidth)
}


useEffect(()=>{
    if(props.addWidth){
        getCardWidth()
    }
},[])

return(
    <Link to={props.link} ref={width} className={GroupCardStyles.container}>
<p className={GroupCardStyles.infoArea}>{props.area}</p>
<p className={GroupCardStyles.infoGroup}>{props.grade} {props.group}</p>
<div className={GroupCardStyles.infoStudentsContainer}>
    <div className={GroupCardStyles.numberStudents}>
<p className={GroupCardStyles.infoStudents}>{props.students}</p>
</div>
<p className={GroupCardStyles.info}>{props.info}</p>
</div>
    </Link>
)
}

export default GroupCard