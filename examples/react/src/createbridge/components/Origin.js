import React from 'react'

import { Container, Row, Label  } from './shared'
import { ContributorsContainer } from './ContributorsContainer'

export const Origin = ({ origin }) => {
  const isContributer = (value) => {
    return value === 'contributors'
  }
  return (
    <Container>
      {Object.keys(origin).map((key) => (
        <Row key={key}>
          <Label>{key}:</Label>
          <div>{isContributer(key) ? <ContributorsContainer contributors={origin[key]} /> : origin[key]}</div>
        </Row>
      ))}
    </Container>
  )
}
