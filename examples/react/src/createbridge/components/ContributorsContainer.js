import React, { useState }from 'react'

import { ContributorsView } from './ContributorsView'

export const ContributorsContainer = (props) => {
  const [openContainers, setOpenContainers] = useState({})

  const handleClick = (contributor) => {
    const newOpenContainersState = {
      ...openContainers,
      [contributor]: !openContainers[contributor]
    }
    setOpenContainers(newOpenContainersState)
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