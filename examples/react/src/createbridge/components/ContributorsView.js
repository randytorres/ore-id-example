import React from 'react'
import styled from '@emotion/styled'

import { Container as _Container, Column } from './shared'

export const ContributorsView = ({ isVisible, contributor, handleClick }) => (
  <Container onClick={() => handleClick(contributor.contributor)}>
    { !isVisible
      ? <p><strong>{contributor.contributor}</strong></p>
      : <Column column={contributor} render={(columnKey) => <div>{contributor[columnKey]}</div>}/>
    }
  </Container>
)

const Container = styled(_Container)({
  borderWidth: '5px',
  cursor: 'pointer',
})