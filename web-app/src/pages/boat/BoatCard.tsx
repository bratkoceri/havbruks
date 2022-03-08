import React, { SyntheticEvent } from 'react'
import { Card, Button, Col, Row } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { IBoat, ICrewMember } from '../../types'
import { CrewList } from '../../components/crew/CrewList'
import { useNavigate } from 'react-router-dom'
import { ApplicationRoutes } from '../../routing/routes'

interface Props {
  boat: IBoat
  crew?: ICrewMember[]
  onClick?: (boatId: number) => any
  onDelete?: (boatId: number) => any
  showCrew: boolean
}

export const BoatCard: React.FC<Props> = props => {
  const navigate = useNavigate()
  const { boat, onDelete, onClick, showCrew} = props

  const deleteHandler = (e: SyntheticEvent) => {
    e.stopPropagation()
    onDelete && onDelete(boat.id)
  }

  const editHandler = (e: any) => {
    e.stopPropagation()
    navigate(ApplicationRoutes.boat_edit.getRoute(boat.id))
  }

  return (
    <Card
      title={boat.name}
      bordered
      onClick={onClick ? () => onClick(boat.id) : undefined}
      actions={
        onDelete && [
          <EditOutlined key="edit" onClick={editHandler} />,
          <DeleteOutlined key="delete" onClick={deleteHandler} />
        ]
      }
      cover={<img src={boat.picture} alt="img"/>}
      style={{height: 400 }}
    >
      <Row>
      <Col key={2} flex={9}>
           <p><b>Producer:</b> {boat.producer}</p>
           <p><b>Build Number:</b> {boat.buildNumber}</p>
           <p><b>Max Length:</b> {boat.loa}</p>
           <p><b>Max Width:</b> {boat.b}</p>
      </Col>
      </Row>
      {showCrew? <div><CrewList boat={boat} /><Button style={{ margin: '15px 0' }} onClick={()=>{navigate(ApplicationRoutes.cm_create.getRoute(boat.id))}}>Add Crew Member</Button></div>:<div></div>}
    </Card>
  )
}
