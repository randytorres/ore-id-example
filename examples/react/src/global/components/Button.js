import React from 'react';
import Roboto from '../assets/Roboto-Medium.ttf'
import { VALID_PROVIDERS } from '../constants/validProviders'

const defaultButtonStyle = {
  padding: '10px 24px 10px 14px',
  backgroundColor: '#3E5895',
  color: '#ffffff',
  fontFamily: Roboto + 'sans-serif',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '22px',
  letterSpacing: '1px',
  textAlign: 'left',
  border: 'none',
  borderRadius: '5px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
}

const defaultLogoStyle = {
  width: '24px',
  marginLeft: '10px',
  marginRight: '10px',
  verticalAlign: 'bottom'
}

export const Button = (props) => {
  const checkValidProvider = (provider) => {
    if(!VALID_PROVIDERS.includes(provider)) {
      throw Error(`${provider} is not one of the supported providers. Use one of the following: ${VALID_PROVIDERS.join(', ')}`);
    }
  }

  checkValidProvider(props.provider)
  
  const providerStyle = require(`../assets/${props.provider}-style.json`)

  return (
    <button
      style={{ ...defaultButtonStyle, ...props.buttonStyle, ...providerStyle.buttonStyle }}
      onClick={props.onClick}
     > 
      <img
        style={{ ...defaultLogoStyle, ...props.logoStyle, ...providerStyle.logoStyle }}
        src={require(`../../global/assets/${props.provider}-logo.png`)}
        alt={props.text}
      />
      {props.children}
    </button> 
  )
}