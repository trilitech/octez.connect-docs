/// START
import { TezosToolkit } from "@tezos-x/octez.js";
import { BeaconWallet } from "@tezos-x/octez.js-dapp-wallet";
import Logger from "../Logger";
/// END

const disconnectWalletOctezJs2 = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const Tezos = new TezosToolkit("https://mainnet.api.tez.ie");
  const wallet = new BeaconWallet({ name: "Beacon Docs octez.js" });

  Tezos.setWalletProvider(wallet);

  try {
    await wallet.client.disconnect();
  } catch (err: any) {
    logger.log("Error: ", err.message);
  }

  /// END
};
export default disconnectWalletOctezJs2;
