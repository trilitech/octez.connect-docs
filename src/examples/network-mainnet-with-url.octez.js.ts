/// START
import { TezosToolkit } from "@tezos-x/octez.js";
import { BeaconWallet } from "@tezos-x/octez.js-dapp-wallet";
import { NetworkType } from "../node_modules/octez.connect-sdk/dist/cjs";
import Logger from "../Logger";
/// END

const networkMainnetWithUrlTaquito = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const Tezos = new TezosToolkit("https://mainnet.api.tez.ie");
  const wallet = new BeaconWallet({
    name: "Beacon Docs Taquito",
    network: {
      type: NetworkType.MAINNET,
      rpcUrl: "https://mainnet.api.tez.ie",
    },
  });

  Tezos.setWalletProvider(wallet);

  // Mainnet with different rpcUrl
  try {
    const result = await wallet.client.requestPermissions();
    logger.log("Permissions: ", result);
  } catch (error) {
    logger.log("Error: ", error.message);
  }
  /// END
};
export default networkMainnetWithUrlTaquito;
