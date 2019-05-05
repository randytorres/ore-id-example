import React, { useState, useEffect } from 'react'
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
    console.info(tableData)
    setOrigins(tableData)
  }

  useEffect(() => {
    handleSetOrigins()
  }, [])

  return (
    <div>
      <h3>Create Bridge</h3>
      {origins.map((origin) => <Origin origin={origin} />)}
    </div>
  )
}
