import React, { useState }from 'react'
import { ContributorsView } from './ContributorsView'

export const ContributorsContainer = (props) => {
  const [openContainers, setOpenContainers] = useState({})

  const handleClick = (contributor) => {
    const newOpenContainers = {
      ...openContainers,
      [contributor]: !openContainers[contributor]
    }
    setOpenContainers(newOpenContainers)
  }
  
  return props.contributors.map((contributor) => (
    <ContributorsView
      key={contributor.contributor}
      isVisible={openContainers[contributor.contributor]}
      handleClick={handleClick}
      contributor={contributor}
    />
  ))
}