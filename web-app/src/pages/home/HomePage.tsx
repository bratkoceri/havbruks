import React from 'react'
import { useQuery } from 'react-query'
import * as Endpoints from '../../http/endpoints'
import { BoatList } from '../boat/BoatList'
import { UseQueryKeys } from '../../http/useQueryKeys'
import { Row, Button } from 'antd'
import { ApplicationRoutes } from '../../routing/routes'
import { useNavigate } from 'react-router-dom'

export const HomePage: React.FC = () => {
  const { data, isLoading, error } = useQuery(UseQueryKeys.FETCH_BOATS, Endpoints.fetchAllBoats)
  const navigate = useNavigate();
  if (isLoading) return <div></div>
  if (error || !data) return <div>Failed to fetch...</div>

  return (
    <div style={{ margin: '35px 15%' }}>
        <Row justify="end" style={{ marginBottom: 10 }}>
          <Button onClick={() => navigate(ApplicationRoutes.boat_create)}>Register Boat</Button>
        </Row>
        {data.length ? (
          <BoatList boats={data} />
        ) : (
          <Row justify="center" className="bold">
            No Boats Registered{' '}
          </Row>
        )}
    </div>
  )
}
