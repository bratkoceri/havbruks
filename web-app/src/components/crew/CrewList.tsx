import React from 'react'
import { Table } from 'antd'
import { IBoat, ICrewMember } from '../../types'

interface Props {
  boat: IBoat
}

export const CrewList: React.FC<Props> = ({ boat }) => {
  const { Column } = Table;
  return (
    <div style={{ marginTop: 5 }}>
      <>
        <h1>Crew</h1>
        <Table dataSource={boat.crew}>
        <Column
          title="Picture"
          dataIndex="picture"
          key="pic"
          render={(text, record: ICrewMember) => (
            <>
            <img src={record.picture} width={50} height={50} alt="pic"></img>
            </>
          )}
        />
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="Age" dataIndex="age" key="age" />
          <Column title="Role" dataIndex="role" key="role" />
        </Table>        
      </>
    </div>
  )
}
