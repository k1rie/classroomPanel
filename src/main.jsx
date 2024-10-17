import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider,} from 'react-router-dom'
import Home from './Home.jsx'

import "./styles/normalize.css"
import Group from './Group.jsx'
import Student from './Student.jsx'
import Attendance from './attendance.jsx'
import Scanner from "./Scanner.jsx"

const Router = createBrowserRouter(
  [
    {path:"/",element:<Home/>},
    {path:"/group/:id", element:<Group/>},
    {path:"/student/group/:idgroup/:id",element:<Student/>},
    {path:"/attendance/:id/:name/:lastName/:grade/:group/:area/:email",element:<Attendance/>},
    {path:"/scanner",element: <Scanner/>}
  ]
)

createRoot(document.getElementById('root')).render(
 <RouterProvider router={Router}/>
)
