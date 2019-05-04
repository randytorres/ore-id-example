import React from 'react'
import { Button } from '../../global'

export const DiscoveryOptions = ({
  chainNetwork,
  handleWalletDiscoverButton,
}) => {
  const walletButtons = [
    {provider:'scatter', chainNetwork},
    {provider:'ledger', chainNetwork},
    {provider:'lynx', chainNetwork},
    {provider:'meetone', chainNetwork},
    {provider:'tokenpocket', chainNetwork}
  ];
  
  const onClick = async (index) => {
    await handleWalletDiscoverButton(index)
  }

  return (
    <div>
      <div style={{ marginTop: 50, marginLeft: 20 }}>
        <h3 style={{ marginTop: 50 }}>
          Or discover a key in your wallet
        </h3>
        <ul>
          {walletButtons.map((wallet, index) => (
            <div style={{ alignContent:'center' }} key={wallet.provider}>
              <Button
                provider={wallet.provider}
                data-tag={index}
                buttonStyle={{ width:80, marginLeft:-20, marginTop:20, marginBottom:10 }}
                text={wallet.provider}
                onClick={() => onClick(index)}
              >
                {wallet.provider}
              </Button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}