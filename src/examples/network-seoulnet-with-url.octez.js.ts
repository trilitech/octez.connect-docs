/// START
import { TezosToolkit } from "@tezos-x/octez.js";
import { BeaconWallet } from "@tezos-x/octez.js-dapp-wallet";
import { NetworkType } from "@tezos-x/octez.connect-dapp";
import Logger from "../Logger";
/// END

const networkSeoulnetWithRpcOctezJs = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const Tezos = new TezosToolkit("https://mainnet.api.tez.ie");
  const wallet = new BeaconWallet({
    name: "Beacon Docs",
    network: { type: NetworkType.SEOULNET },
  });

  Tezos.setWalletProvider(wallet);

  // Seoulnet with different rpcUrl
  try {
    const result = await wallet.client.requestPermissions();
    logger.log("Permissions: ", result);
  } catch (error) {
    logger.log("Error: ", error.message);
  }
  /// END
};
export default networkSeoulnetWithRpcOctezJs;
