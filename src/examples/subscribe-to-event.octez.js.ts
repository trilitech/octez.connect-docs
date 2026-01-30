/// START
import { TezosToolkit } from "@tezos-x/octez.js";
import { BeaconWallet } from "@tezos-x/octez.js-dapp-wallet";
import { BeaconEvent } from "../node_modules/octez.connect-sdk/dist/cjs";
import Logger from "../Logger";
/// END

const subscribeToEventTaquito = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const Tezos = new TezosToolkit("https://mainnet.api.tez.ie");
  const wallet = new BeaconWallet({ name: "Beacon Docs Taquito" });

  Tezos.setWalletProvider(wallet);

  await wallet.clearActiveAccount();

  logger.log("Active account: ", await wallet.client.getActiveAccount());

  wallet.client.subscribeToEvent(BeaconEvent.PAIR_SUCCESS, (data) => {
    logger.log(`${BeaconEvent.PAIR_SUCCESS} triggered: `, data);
  });
  try {
    await wallet.client.requestPermissions();
  } catch (error) {
    logger.log("Error: ", error.message);
  }
  /// END
};
export default subscribeToEventTaquito;
