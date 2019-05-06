import React from 'react'

import { Login } from '../../login'
import { UserDetails } from '../../user'
import { DiscoveryOptions } from './DiscoveryOptions'
import { SigningOptions } from './SigningOptions'
import { CreateBridge } from '../../createbridge'

export const AppView = ({
  isLoggedIn,
  isBusy,
  errorMessage,
  signedTransaction,
  signState,
  chainNetworkForExample,
  handleLogin,
  handleLogout,
  handleSignButton,
  userInfo,
  handleWalletDiscoverButton,
}) => (
  <div>
    <div>
      {!isLoggedIn && <Login handleLogin={handleLogin} />}
      {isLoggedIn && <UserDetails {...userInfo} handleLogout={handleLogout} />}
      {isLoggedIn && <SigningOptions userInfo={userInfo} handleSignButton={handleSignButton} />}
    </div>
    <h3 style={{ color:'green', margin:'50px' }}>
      {isBusy && 'working...'}
    </h3>
    <div style={{ color:'red', margin:'50px' }}>
      {errorMessage}
    </div>
    <div style={{ color:'blue', marginLeft:'50px', marginTop:'50px' }}>
      {signedTransaction && `Returned signed transaction: ${signedTransaction}`}
    </div>
    <div style={{ color:'blue', marginLeft:'50px',marginTop:'10px' }}>
      {signState && `Returned state param: ${signState}`}
    </div>
    {isLoggedIn && <DiscoveryOptions chainNetwork={chainNetworkForExample} handleWalletDiscoverButton={handleWalletDiscoverButton} />}
    {isLoggedIn && <CreateBridge />}
  </div>
)