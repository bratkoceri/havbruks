import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Row, Col, message } from 'antd'

import * as Http from '../../http/endpoints'
import { BoatCard } from './BoatCard'
import { IBoat } from '../../types'
import { UseQueryKeys } from '../../http/useQueryKeys'
import { useNavigate } from 'react-router-dom'
import { ApplicationRoutes } from '../../routing/routes'

interface Props {
  boats: IBoat[]
}

export const BoatList: React.FC<Props> = ({ boats }) => {

  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const mutation = useMutation(Http.deleteBoat, {
    onSuccess: () => {
      message.warn('Deleted!', 1)
      queryClient.invalidateQueries(UseQueryKeys.FETCH_BOATS)
    },
  })

  const onCardClick = (boatId: number) => navigate(ApplicationRoutes.boat.getRoute(boatId))

  return (
    <Row gutter={24} justify="center">
      {boats.map((boat) => {
        return (
          <Col key={boat.id} xl={8} md={24} style={{ marginBottom: 50 }}>
            <BoatCard boat={boat} onClick={onCardClick} onDelete={(id) => {mutation.mutate(id)}} showCrew={false}/>
          </Col>
        )
      })}
    </Row>
  )
}
