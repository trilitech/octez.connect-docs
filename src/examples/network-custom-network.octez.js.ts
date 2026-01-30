/// START
import { TezosToolkit } from "@tezos-x/octez.js";
import { BeaconWallet } from "@tezos-x/octez.js-dapp-wallet";
import { NetworkType } from "../node_modules/octez.connect-sdk/dist/cjs";
import Logger from "../Logger";
/// END

const networkCustomTaquito = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const Tezos = new TezosToolkit("https://mainnet.api.tez.ie");
  const wallet = new BeaconWallet({
    name: "Beacon Docs Taquito",
    network: {
      type: NetworkType.CUSTOM,
      name: "Local Node",
      rpcUrl: "http://localhost:8732/",
    },
  });

  Tezos.setWalletProvider(wallet);

  // Custom network (eg. local development or latest testnet)
  try {
    const result = await wallet.client.requestPermissions();
    logger.log("Permissions: ", result);
  } catch (error) {
    logger.log("Error: ", error.message);
  }
  /// END
};
export default networkCustomTaquito;
