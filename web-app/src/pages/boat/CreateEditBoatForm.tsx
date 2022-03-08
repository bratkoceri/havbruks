import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Form, Input, InputNumber, Button, Upload } from 'antd'
import { IBoat, IBoatForm } from '../../types'
import { FormInstance } from 'antd/lib/form'


interface Props {
  initialValues?: IBoat
  form: FormInstance
  onSubmit: (values: IBoatForm) => void
}

export const CreateEditBoatForm: React.FC<Props> = ({ form, initialValues, onSubmit }) => {
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
      initialValues={initialValues}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="producer" label="Producer" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="buildNumber" label="Build number" rules={[{ required: true }]}>
        <InputNumber min={1} max={100} />
      </Form.Item>

      <Form.Item name="loa" label="Max length" rules={[{ required: true }]}>
        <InputNumber decimalSeparator="." />
      </Form.Item>

      <Form.Item name="b" label="Max width" rules={[{ required: true }]}>
        <InputNumber decimalSeparator="." />
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
