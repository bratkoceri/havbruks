import React from 'react'
import { Form } from 'antd'
import { useMutation, useQueryClient } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { CreateCrewForm } from './CreateCrewForm'
import { ICrewMember } from '../../types'
import * as Http from '../../http/endpoints'
import { UseQueryKeys } from '../../http/useQueryKeys'
import { ApplicationRoutes } from '../../routing/routes'

export const CreateCrewPage: React.FC = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  let {boatId} = useParams()
  let bId = parseInt(boatId? boatId : '0')
  const [form] = Form.useForm()
  const mutation = useMutation(Http.creteCM, {
    onSuccess: () => {
      queryClient.invalidateQueries([UseQueryKeys.FETCH_BOAT, boatId])
      navigate(ApplicationRoutes.boat.getRoute(bId))
    },
  })

  const onSubmit = (form: ICrewMember) => {
    console.log(`I am here: ${form}`)
    mutation.mutate({ boatId: bId, form: form })
  }

  return (
    <div style={{ margin: '35px 15%' }}>
      <h1>Create crew member</h1>
      <CreateCrewForm boatId={bId} form={form} onSubmit={onSubmit} />
    </div>
  )
}
