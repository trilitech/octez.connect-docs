/// START
import { TezosToolkit } from "@tezos-x/octez.js";
import { BeaconWallet } from "@tezos-x/octez.js-dapp-wallet";
import Logger from "../Logger";
import { NetworkType } from "@tezos-x/octez.connect-sdk";
/// END

const infoVersionOctezJs = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const Tezos = new TezosToolkit("https://rpc.shadownet.teztnets.com");
  const wallet = new BeaconWallet({
    name: "Beacon Docs octez.js",
    network: { type: NetworkType.SHADOWNET },
  });

  Tezos.setWalletProvider(wallet);

  logger.log(`Connected Accounts:`, await wallet.client.getAccounts());
  logger.log(`Connected Peers:`, await wallet.client.getPeers());
  /// END
};
export default infoVersionOctezJs;
