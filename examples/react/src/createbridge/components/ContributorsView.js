import React from 'react'
import { Container, Row, Label } from './shared'

export const ContributorsView = ({ isVisible, contributor, handleClick }) => (
  <Container onClick={() => handleClick(contributor.contributor)}>
    {!isVisible
      ? <p>Contributor: {contributor.contributor}</p>
      : Object.keys(contributor).map((key) => {
          return (
            <Row key={key}>
              <Label>{key}:</Label>
              <div>{contributor[key]}</div>
            </Row>
          )
        })
    }
  </Container>
)