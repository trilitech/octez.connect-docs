/// START
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { BeaconEvent, NetworkType } from "@tezos-x/octez.connect-dapp";
import Logger from "../Logger";
/// END

const subscribeToEventTaquito = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const Tezos = new TezosToolkit("https://rpc.shadownet.teztnets.com");
  const wallet = new BeaconWallet({
    name: "Beacon Docs Taquito",
    network: { type: NetworkType.SHADOWNET },
  });

  Tezos.setWalletProvider(wallet);

  await wallet.clearActiveAccount();

  logger.log("Active account: ", await wallet.client.getActiveAccount());

  wallet.client.subscribeToEvent(BeaconEvent.PAIR_SUCCESS as any, (data) => {
    logger.log(`${BeaconEvent.PAIR_SUCCESS} triggered: `, data);
  });
  try {
    await wallet.client.requestPermissions();
  } catch (error) {
    logger.log("Error: ", error?.message ?? error);
  }
  /// END
};
export default subscribeToEventTaquito;
