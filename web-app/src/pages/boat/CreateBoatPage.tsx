import React from 'react'
import { Form } from 'antd'
import { useMutation, useQueryClient } from 'react-query'

import * as Http from '../../http/endpoints'
import { UseQueryKeys } from '../../http/useQueryKeys'
import { ApplicationRoutes } from '../../routing/routes'
import { CreateEditBoatForm } from './CreateEditBoatForm'
import { useNavigate } from 'react-router-dom'

export const CreateBoatPage: React.FC = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const mutation = useMutation(Http.createBoat, {
    onSuccess: () => {
      queryClient.invalidateQueries(UseQueryKeys.FETCH_BOATS)
      navigate(ApplicationRoutes.home)
    },
  })

  return (
    <div style={{ margin: '35px 15%' }}>
      <h1>Create boat</h1>
      <CreateEditBoatForm form={form} onSubmit={(newBoat) => {mutation.mutate(newBoat)}} />
    </div>
  )
}
