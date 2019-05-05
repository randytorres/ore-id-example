import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { getEosJsRPC } from '../../global/api'
import { Origin } from './Origin'

const rpc = getEosJsRPC()

export const CreateBridgeView = () => {
  const [origins, setOrigins] = useState([])

  const fetchTableRows = async () => {
    const result = await rpc.get_table_rows({
      code: "createbridge",
      table: "balances",
      scope: "createbridge",
      json: true
    })

    return result.rows
  }

  const handleSetOrigins= async () => {
    const tableData = await fetchTableRows()
    setOrigins(tableData)
  }

  useEffect(() => {
    handleSetOrigins()
  }, [])

  return (
    <Container>
      <h3>Create Bridge</h3>
      {origins.map((origin) => <Origin key={JSON.stringify(origin)} origin={origin} />)}
    </Container>
  )
}

const Container = styled.div({
  marginLeft: 20,
})