import dotenv from 'dotenv';
import React, { useState, useEffect } from 'react';
import { OreId } from 'eos-auth';
import scatterProvider from 'eos-transit-scatter-provider';
import ledgerProvider from 'eos-transit-ledger-provider'
import lynxProvider from 'eos-transit-lynx-provider';
import meetoneProvider from 'eos-transit-meetone-provider';
import tokenpocketProvider from 'eos-transit-tokenpocket-provider';

import { AppView } from './AppView'

dotenv.config();

const chainNetworkForExample = 'eos_kylin';

const { 
  REACT_APP_OREID_APP_ID: appId,              // Provided when you register your app
  REACT_APP_OREID_API_KEY: apiKey,             // Provided when you register your app
  REACT_APP_AUTH_CALLBACK: authCallbackUrl,    // The url called by the server when login flow is finished - must match one of the callback strings listed in the App Registration
  REACT_APP_SIGN_CALLBACK: signCallbackUrl,    // The url called by the server when transaction signing flow is finished - must match one of the callback strings listed in the App Registration
  REACT_APP_OREID_URL: oreIdUrl,               // HTTPS Address of OREID server
  REACT_APP_BACKGROUND_COLOR: backgroundColor  // Background color shown during login flow
} = process.env;

const eosTransitWalletProviders = [
  scatterProvider(),
  ledgerProvider({ pathIndexList: [ 0, 1, 2, 35 ] }),
  lynxProvider(),
  meetoneProvider(),
  tokenpocketProvider(),
]


export const AppContainer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isBusy, setIsBusy] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [signedTransaction, setSignedTransaction] = useState({})
  const [signState, setSignState] = useState({})

  // called by library to set local busy state
  const setBusyCallback = (isBusy) => {
    setIsBusy(isBusy)
  }

  const [oreId] = useState(new OreId({ appName:"ORE ID Sample App", appId, apiKey, oreIdUrl, authCallbackUrl, signCallbackUrl, backgroundColor, eosTransitWalletProviders, setBusyCallback }))

  const loadUserFromLocalState = async () => {
    const userInfo = await oreId.getUser() || {};
    if((userInfo || {}).accountName) {
      setUserInfo(userInfo)
      setIsLoggedIn(true)
    }
  }

  const loadUserFromApi = async (account) => {
    try {
      const userInfo = await oreId.getUserInfoFromApi(account) || {};
      setUserInfo(userInfo)
      setIsLoggedIn(true)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const clearErrors = () => {
    setErrorMessage(null)
    setSignedTransaction(null)
    setSignState(null)
  }

  const handleLogout = () => {
    clearErrors();
    setUserInfo({})
    setIsLoggedIn(false)
    oreId.logout(); //clears local user state (stored in local storage or cookie)
  }

  const handleSignButton = async (permissionsToRender, permissionIndex) => {
    clearErrors();
    let { chainAccount, chainNetwork, permission, externalWalletType: provider } = permissionsToRender[permissionIndex] || {};
    const { accountName } = userInfo;
    provider = provider || 'oreid';  //default to ore id
    await handleSignSampleTransaction(provider, accountName, chainAccount, chainNetwork, permission);
  }

  const handleWalletDiscoverButton = async (permissionIndex) => {
    const chainNetwork = chainNetworkForExample;
    try {
      clearErrors();
      const { provider } = userInfo.walletButtons[permissionIndex] || {};
      if (oreId.canDiscover(provider)) {
        await oreId.discover(provider, chainNetwork);
      } else {
        console.log(`Provider doesn't support discover, so we'll call login instead`);
        await oreId.login({ provider, chainNetwork });
      }
      loadUserFromApi(userInfo.accountName); //reload user from ore id api - to show new keys discovered
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  const handleLogin = async (provider) => {
    let chainNetwork = chainNetworkForExample;
    try {
      clearErrors();
      let loginResponse = await oreId.login({ provider, chainNetwork });
      //if the login responds with a loginUrl, then redirect the browser to it to start the user's OAuth login flow
      let { isLoggedIn, account, loginUrl } = loginResponse;
      if (loginUrl) {
        //redirect browser to loginURL
        window.location = loginUrl;
      }
      setUserInfo({ accountName: account });
      setIsLoggedIn(isLoggedIn)
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  const handleSignSampleTransaction = async (provider, account, chainAccount, chainNetwork, permission) => {
    try {
      clearErrors();
      const transaction = createSampleTransaction(chainAccount, permission);
      let signOptions = {
        provider:provider || '',  //wallet type (e.g. 'scatter' or 'oreid')
        account:account || '',
        broadcast:false,  //if broadcast=true, ore id will broadcast the transaction to the chain network for you 
        chainAccount:chainAccount || '',
        chainNetwork:chainNetwork || '',
        state:'abc',  //anything you'd like to remember after the callback
        transaction,
        accountIsTransactionPermission:false
      }
      let signResponse = await oreId.sign(signOptions);
      //if the sign responds with a signUrl, then redirect the browser to it to call the signing flow
      let { signUrl, signedTransaction } = signResponse || {};
      if(signUrl) {
        //redirect browser to signUrl
        window.location = signUrl;
      }
      if(signedTransaction) {
        setSignedTransaction(JSON.stringify(signedTransaction))
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const createSampleTransaction = (actor, permission = 'active') => {
    const transaction = {
      account: "eosio.token",
      name: "transfer",
      authorization: [{
        actor,
        permission,
      }],
      data: {
        from: actor,
        to: actor,
        quantity: "0.0001 EOS",
        memo: `random number: ${Math.random()}`
      }
    };
    return transaction;
  }


  /*
    Handle the authCallback coming back from ORE-ID with an "account" parameter indicating that a user has logged in
  */
  const handleAuthCallback = async () => {
    const url = window.location.href;
    if (/authcallback/i.test(url)) {
      const { account, errors } = await oreId.handleAuthResponse(url);
      if(!errors) {
        loadUserFromApi(account);
      }
    }
  }

  /*
    Handle the signCallback coming back from ORE-ID with a "signedTransaction" parameter providing the transaction object with signatures attached
  */
  const handleSignCallback = async () => {
    const url = window.location.href;
    if (/signcallback/i.test(url)) {
      const {signedTransaction, state, errors} = await oreId.handleSignResponse(url);
      if(!errors && signedTransaction) {
        setSignedTransaction(JSON.stringify(signedTransaction))
        setSignState(state)
      }
      else {
        setErrorMessage(errors.join(", "))
      }
    }
  }

  useEffect(() => {
    loadUserFromLocalState();
    handleAuthCallback();
    handleSignCallback();
  }, [])

  return (
    <AppView
      isLoggedIn={isLoggedIn}
      isBusy={isBusy}
      errorMessage={errorMessage}
      signedTransaction={signedTransaction}
      signState={signState}
      userInfo={userInfo}
      chainNetworkForExample={chainNetworkForExample}
      handleLogin={handleLogin}
      handleLogout={handleLogout}
      handleSignButton={handleSignButton}
      handleWalletDiscoverButton={handleWalletDiscoverButton}
    />
  );
}