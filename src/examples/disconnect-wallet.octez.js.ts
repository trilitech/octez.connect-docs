/// START
import { TezosToolkit } from "@tezos-x/octez.js";
import { BeaconWallet } from "@tezos-x/octez.js-dapp-wallet";
import Logger from "../Logger";
/// END

const disconnectWalletOctezJs = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const Tezos = new TezosToolkit("https://mainnet.api.tez.ie");
  const wallet = new BeaconWallet({ name: "Beacon Docs octez.js" });

  Tezos.setWalletProvider(wallet);

  await wallet.clearActiveAccount();

  try {
    const account = await wallet.getPKH();
    logger.log("Active Account", account);
  } catch {
    logger.log("No wallet connected");
  }

  /// END
};
export default disconnectWalletOctezJs;
