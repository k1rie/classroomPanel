import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider,} from 'react-router-dom'
import Home from './Home.jsx'

import "./styles/normalize.css"
import Group from './Group.jsx'
import Student from './Student.jsx'
import Attendance from './attendance.jsx'

const Router = createBrowserRouter(
  [
    {path:"/",element:<Home/>},
    {path:"/group/:id/:area/:grade/:group", element:<Group/>},
    {path:"/student/group/:idgroup/:id/:grade/:group/:area",element:<Student/>},
    {path:"/attendance/:name/:lastname/:grade/:group/:area/:email",element:<Attendance/>}

  ]
)

createRoot(document.getElementById('root')).render(
 <RouterProvider router={Router}/>
)
