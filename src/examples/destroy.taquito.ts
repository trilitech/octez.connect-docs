/// START
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import Logger from "../Logger";
import { NetworkType } from "@tezos-x/octez.connect-sdk";
/// END

const destroyTaquito = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const Tezos = new TezosToolkit("https://rpc.shadownet.teztnets.com");
  const wallet = new BeaconWallet({
    name: "Beacon Docs Taquito",
    network: { type: NetworkType.SHADOWNET },
  });

  Tezos.setWalletProvider(wallet);

  try {
    await wallet.disconnect();
    await wallet.clearActiveAccount();
    logger.log("Instance destroyed.");
  } catch (err: any) {
    logger.log("Error: ", err.message);
  }

  /// END
};
export default destroyTaquito;
