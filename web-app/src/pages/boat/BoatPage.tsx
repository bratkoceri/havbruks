import React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { message } from 'antd'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { BoatCard } from './BoatCard'
import { UseQueryKeys } from '../../http/useQueryKeys'
import * as Http from '../../http/endpoints'
import { ApplicationRoutes } from '../../routing/routes'

export const BoatPage: React.FC = () => {
  const queryClient = useQueryClient()
  let {id} = useParams()
  let boatId = parseInt(id? id : '0')
  const navigate = useNavigate()
  const { data, isLoading, error } = useQuery([UseQueryKeys.FETCH_BOATS, boatId], async () => {
                                                                                    const data = await Http.fetchBoat('A', boatId)
                                                                                    return data
                                                                                  })

  const mutation = useMutation(Http.deleteBoat, {
    onSuccess: () => {
      message.warn('Deleted!', 1)
      queryClient.invalidateQueries(UseQueryKeys.FETCH_BOATS)
      navigate(ApplicationRoutes.home)
    },
  })

  if (isLoading) return <div></div>
  if (error || !data) return <Navigate to={ApplicationRoutes.home} />

  return (
    <div style={{ margin: '35px 15%' }}>
            <BoatCard boat={data} onDelete={(id) => {mutation.mutate(id)}} showCrew={true}/>
    </div>
  )
}
