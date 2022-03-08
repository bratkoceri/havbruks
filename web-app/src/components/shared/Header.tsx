import React from 'react'
import { PageHeader } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ApplicationRoutes } from '../../routing/routes'

export const Header = () => {
  const navigate = useNavigate()

  const goToHome = () => {
    navigate(ApplicationRoutes.home)
  }

  return (
    <PageHeader title={<div className="pointer" onClick={goToHome}>Havbruksloggen (Aquaculture Log)</div>}/>
  )
}
