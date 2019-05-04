import React from 'react'
import { LoginButton } from './loginButton'
import { AVAILABLE_PROVIDERS } from '../constants/availableProviders'

export const Login = ({ handleLogin }) => (
  <>
    {AVAILABLE_PROVIDERS.map(({ provider }) => (
      <LoginButton provider={provider}
        buttonStyle={{ width:250, marginTop:'24px' }}
        logoStyle={{ marginLeft: 0 }}
        onClick={() => handleLogin(provider)}
      />
    ))}
  </>
)