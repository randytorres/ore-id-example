import React from 'react'
import styled from '@emotion/styled'

import { Container, Column } from './shared'
import { ContributorsContainer } from './ContributorsContainer'

export const Origin = ({ origin }) => {
  const isContributer = (value) => {
    return value === 'contributors'
  }
  return (
    <Container>
      <Title>App Name: {origin.origin}</Title>
      <Column
        column={origin}
        render={(columnKey) => (
          <Row>
            { isContributer(columnKey)
              ? <ContributorsContainer contributors={origin[columnKey]} />
              : origin[columnKey]
            }
          </Row>
        )}
      />
    </Container>
  )
}

const Row = styled.div({
  width: '100%',
})

const Title = styled.p({
  textAlign: 'center',
  fontSize: '2rem',
  fontWeight: 'bold',
})