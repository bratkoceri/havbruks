import React from 'react'
import { Form } from 'antd'
import { useNavigate, Navigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient, useQuery } from 'react-query'

import * as Http from '../../http/endpoints'
import { UseQueryKeys } from '../../http/useQueryKeys'
import { ApplicationRoutes } from '../../routing/routes'
import { CreateEditBoatForm } from './CreateEditBoatForm'
import { IBoatForm } from '../../types'

export const UpdateBoatPage: React.FC = () => {
  let { id } = useParams();
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const boatId = parseInt(id? id : '0')
  const [form] = Form.useForm()
  const mutation = useMutation(Http.updateBoat, {
    onSuccess: () => {
      queryClient.invalidateQueries(UseQueryKeys.FETCH_BOATS)
      queryClient.invalidateQueries([UseQueryKeys.FETCH_BOAT, boatId])
      navigate(ApplicationRoutes.home)
    },
  })

  const { data, isLoading, error } = useQuery([UseQueryKeys.FETCH_BOAT, boatId], async () => {
    const data = await Http.fetchBoat('A', boatId)
    return data
  })

  if (isLoading) return <div></div>
  if (error || !data) return <Navigate to={ApplicationRoutes.home} />
  
  const onSubmit = (form: IBoatForm) => {
    mutation.mutate({ boatId, form })
  }

  return (
    <div style={{ margin: '35px 15%' }}>
      <h1>Update boat</h1>
      <CreateEditBoatForm initialValues={data} form={form} onSubmit={onSubmit} />
    </div>
  )
}
