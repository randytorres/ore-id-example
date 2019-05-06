import React from 'react'
import styled from '@emotion/styled'

export const Column = (props) => (
  <>
    {Object.keys(props.column).map((key) => (
      <Row key={key}>
        <Label>{key}:</Label>
        {props.render(key)}
      </Row>
    ))}
  </>
)

export const Row = styled.div({
  display: 'flex',
  alignItems: 'center',
})

export const Label = styled.p({
  fontWeight: 'bold',
  width: '8rem',
  textTransform: 'capitalize',
})
