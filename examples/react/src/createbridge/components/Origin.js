import React, { useState } from 'react'
import styled from '@emotion/styled'

export const Origin = ({ origin }) => {
  const isContributer = (value) => {
    return value === 'contributors'
  }

  return (
    <Container>
      {Object.keys(origin).map((key) => {
        return (
          <Row>
            <Label>{key}:</Label>
            <div>{isContributer(key) ? <Contributors contributors={origin[key]} /> : origin[key]}</div>
          </Row>
        )
      })}
    </Container>
  )
}

const Contributors = (props) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleClick = () => {
    setIsVisible(!isVisible)
  }
  
  return props.contributors.map((contributor) => {
    return (
      <div onClick={handleClick}>
        { isVisible
          ? <Origin origin={contributor} />
          : <Container>Contributor: {contributor.contributor}</Container>
        }
      </div>
    )
  })
}

const Container = styled.div({
  padding: '2rem',
  border: '2px solid #000',
  marginBottom: '1rem',
})

const Label = styled.p({
  fontWeight: 'bold',
  width: '8rem',
  textTransform: 'capitalize',
})

const Row = styled.div({
  display: 'flex',
  alignItems: 'center',
})
