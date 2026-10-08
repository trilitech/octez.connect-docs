/// START
import { TezosToolkit } from "@tezos-x/octez.js";
import { BeaconWallet } from "@tezos-x/octez.js-dapp-wallet";
import { NetworkType } from "@tezos-x/octez.connect-dapp";
import Logger from "../Logger";
/// END

const networkMainnetWithUrlOctezJs = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const Tezos = new TezosToolkit("https://rpc.tzbeta.net");
  const wallet = new BeaconWallet({
    name: "Beacon Docs octez.js",
    network: {
      type: NetworkType.MAINNET,
      rpcUrl: "https://rpc.tzbeta.net",
    },
  });

  Tezos.setWalletProvider(wallet);

  // Mainnet with different rpcUrl
  try {
    const result = await wallet.client.requestPermissions();
    logger.log("Permissions: ", result);
  } catch (error) {
    logger.log("Error: ", error?.message ?? error);
  }
  /// END
};
export default networkMainnetWithUrlOctezJs;
