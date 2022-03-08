import React from 'react'
import {Routes, Route} from 'react-router-dom'
import {ApplicationRoutes} from './routes'
import {CreateBoatPage} from '../pages/boat/CreateBoatPage'
import {HomePage} from '../pages/home/HomePage'
import {Header} from '../components/shared/Header'
import 'antd/dist/antd.css'
import { UpdateBoatPage } from '../pages/boat/UpdateBoatPage'
import { BoatPage } from '../pages/boat/BoatPage'
import { CreateCrewPage } from '../components/crew/CreateCrewPage'

export const Router = () => {
    return (
        <>
        <Header/>
        <Routes>
            <Route path={ApplicationRoutes.home} element={<HomePage/>} />
            <Route path={ApplicationRoutes.boat_create} element={<CreateBoatPage/>} />
            <Route path={ApplicationRoutes.boat_edit.url} element={<UpdateBoatPage/>} />
            <Route path={ApplicationRoutes.boat.url} element={<BoatPage/>} />
            <Route path={ApplicationRoutes.cm_create.url} element={<CreateCrewPage/>} />
        </Routes>
        </>
    )
}