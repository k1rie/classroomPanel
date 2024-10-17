import React, { useState, useEffect, useRef } from 'react';
import Navbar from "./components/Navbar";
import Styles from "./styles/Scanner.module.css";
import { Html5Qrcode } from 'html5-qrcode';
import correctSVG from "./assets/check-circle-svgrepo-com.svg"
import notCorrectSVG from "./assets/no-alt-svgrepo-com.svg"

const Scanner = () => {
    const [response,setResponse] = useState()
    const [data, setData] = useState({ name: "No se ha scaneado nada aún", lastName: "" });
    const [createAttendance, setCreateAttendance] = useState(false);
    const correctSVGHTML = useRef()
    const notCorrectSVGHTML = useRef()
    const textResult = useRef()


    useEffect(() => {
        let html5QrCode;

        if (createAttendance) {
            // Inicializa el escáner
            html5QrCode = new Html5Qrcode("reader");
            html5QrCode.start(
                { facingMode: "environment" },
                { fps: 10, qrbox: { width: 250, height: 250 } },
                handleScan,
                handleError
            ).catch(handleError);
        }

        // Limpieza del escáner al desmontar o cambiar de estado
        return () => {
            if (html5QrCode) {
                html5QrCode.stop().then(() => html5QrCode.clear()).catch(console.error);
            }
        };
    }, [createAttendance]);

    const handleScan = async (decodedText) => {
        if (decodedText) {
            const url = new URL(decodedText);
            const pathParts = url.pathname.split('/').filter(Boolean);

            const params = {
                attendance: pathParts[0],
                id: pathParts[1],
                name: pathParts[2],
                lastName: pathParts[3],
                grade: pathParts[4],
                group: pathParts[5],
                area: pathParts[6],
                emailUser: pathParts[7]
            };

            setCreateAttendance(false); // Detener el escáner después del escaneo

            try {
                const credentials = btoa(`${localStorage.getItem("email")}:${localStorage.getItem("password")}`);

                await fetch(`https://tasksflow-backend.onrender.com/attendance`, {
                    method: "POST",
                    headers: {
                        'Authorization': `Basic ${credentials}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: params.name,
                        lastName: params.lastName,
                        grade: params.grade,
                        group: params.group,
                        area: params.area,
                        id: Number(params.id),
                        emailUser: localStorage.getItem("email")
                    })
                }).then(data=>data.json()).then(data=>{
                    console.log(data)
                    if(data.response === true){
                        setResponse(data.response)
                    }else{
                        setData({name:"Parece ser que este no es tu alumno", lastName:""})
                        setResponse(false)
                    }
                })


                await fetch(`https://tasksflow-backend.onrender.com/getStudent/${Number(params.id)}`, {
                    headers: {
                        'Authorization': `Basic ${credentials}`,
                        "Content-Type": "application/json"
                    }
                }).then(data=>data.json()).then(data=>{
                    if(data.length > 0){
                        setData({ name: data[0].nombre, lastName: data[0].apellidos });
                    }

                })

            } catch (error) {
                console.error('Error al procesar la asistencia:', error);
            }
        }
    };

    const handleError = (error) => {
        console.error("Error en el escaneo:", error);
    };

    
    useEffect(()=>{
        console.log(response)
        if(response === true){
            correctSVGHTML.current.style.display = "block"
            notCorrectSVGHTML.current.style.display = "none"
            textResult.current.style.color ="green"
        }
        
        if(response === false){
            correctSVGHTML.current.style.display = "none"
            notCorrectSVGHTML.current.style.display = "block"
            textResult.current.style.color ="red"
        }
            },[response])


    return (
        <>
            <div className={Styles.scanner}>
                <Navbar />
                <div className={Styles.container}>
                    {createAttendance && <div className={Styles.reader} id="reader" ></div>}
                    <p ref={textResult} className={Styles.result}>{`${data.name} ${data.lastName}`}</p>
                    <img ref={correctSVGHTML} className={Styles.correctSVG}src={correctSVG}/>
<img ref={notCorrectSVGHTML} className={Styles.notCorrectSVG} src={notCorrectSVG}/>
                    <button className={Styles.button} onClick={() => setCreateAttendance(true)}>Permitir Asistencia</button>
                </div>
            </div>
        </>
    );
}

export default Scanner;
