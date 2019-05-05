import { JsonRpc } from 'eosjs';

export const getEosJsRPC = () => {
  return new JsonRpc(process.env.REACT_APP_TESTNET_ENDPOINT)
}
