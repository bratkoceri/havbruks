import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import moment from 'moment'
import { Form, Input, InputNumber, Select, DatePicker, Button, Upload } from 'antd'

import { ICrewMember, CrewRole } from '../../types'
import { FormInstance } from 'antd/lib/form'

interface Props {
  initialValues?: ICrewMember
  form: FormInstance
  boatId: number
  onSubmit: (values: ICrewMember) => void
}

export const CreateCrewForm: React.FC<Props> = ({ form, initialValues, onSubmit, boatId }) => {
  const [picture, setPicture] = useState(initialValues?.picture ?? '')
  const getPictureUrl = (e: any) => {
    if (e.file.response) {
      setPicture(e.file.response)

      return e.file.response
    }
  }

  return (
    <Form
      onFinish={onSubmit}
      style={{ width: '50%' }}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      initialValues={initialValues && { ...initialValues, certifiedUntil: moment(initialValues.certifiedUntil) }}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="age" label="Age" rules={[{ required: true }]}>
        <InputNumber min={18} max={100} />
      </Form.Item>

      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
        <Input type="email" />
      </Form.Item>

      <Form.Item name="role" label="Role" rules={[{ required: true }]}>
        <Select placeholder="Select role">
          <Select.Option value={CrewRole.Captain}>Captain</Select.Option>
          <Select.Option value={CrewRole.ChiefEngineer}>Chief Engineer</Select.Option>
          <Select.Option value={CrewRole.DeckCadet}>Deck Cadet</Select.Option>
          <Select.Option value={CrewRole.Motorman}>Motorman</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="certifiedUntil" label="Certified" rules={[{ required: true }]}>
        <DatePicker />
      </Form.Item>

      <Form.Item name="picture" label="Picture" valuePropName="file" getValueFromEvent={getPictureUrl}>
        <Upload
          name="file"
          action={'http://localhost:41938/hblapi/files/upload'}
          listType="picture-card"
          showUploadList={false}
        >
          {picture ? (
            <img src={picture} alt="pic" width={120} height={120} />
          ) : (
            <>
              <UploadOutlined /> Click to upload
            </>
          )}
        </Upload>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <Button type="primary" htmlType="submit">
          {initialValues ? 'Update' : 'Create'}
        </Button>
      </Form.Item>
    </Form>
  )
}
