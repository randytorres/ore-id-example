import React from 'react'
import { Button } from '../../global'

export const SigningOptions = ({
  userInfo,
  handleSignButton,
}) => {
  const { permissions } = userInfo;
  const permissionsToRender = (permissions || []).slice(0);

    
  const onClick = async (index) => {
    await handleSignButton(permissionsToRender, index)
  }

  const renderSignButtons = (permissions) => (
    permissions.map((permission, index) =>  {
      let provider = permission.externalWalletType || 'oreid';
      return (
        <div style={{ alignContent: 'center' }} key={permission.permission}>
          <Button
            provider={provider}
            data-tag={index}
            buttonStyle={{ width: 225, marginLeft: -20, marginTop: 20, marginBottom: 10 }}
            text={`Sign with ${provider}`}
            onClick={() => onClick(index)}
          >
            {`Sign Transaction with ${provider}`}
          </Button>
          {`Chain:${permission.chainNetwork} ---- Account:${permission.chainAccount} ---- Permission:${permission.permission}`}
        </div>
      )
    })
  )

  return (
    <div>
        <div style={{marginTop:50, marginLeft:20}}>
            <h3>Sign transaction with one of your keys</h3>
            <ul>
              {renderSignButtons(permissionsToRender)}
            </ul>
        </div>
    </div>
  );
}