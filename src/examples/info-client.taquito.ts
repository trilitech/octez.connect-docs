/// START
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import Logger from "../Logger";
import { NetworkType } from "@tezos-x/octez.connect-sdk";
/// END

const infoVersionTaquito = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const Tezos = new TezosToolkit("https://rpc.shadownet.teztnets.com");
  const wallet = new BeaconWallet({
    name: "Beacon Docs Taquito",
    network: { type: NetworkType.SHADOWNET },
  });

  Tezos.setWalletProvider(wallet);

  logger.log(`Connected Accounts:`, await wallet.client.getAccounts());
  logger.log(`Connected Peers:`, await wallet.client.getPeers());
  /// END
};
export default infoVersionTaquito;
