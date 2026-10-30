/// START
import { TezosToolkit } from "@tezos-x/octez.js";
import { BeaconWallet } from "@tezos-x/octez.js-dapp-wallet";
import { NetworkType } from "@tezos-x/octez.connect-dapp";
import Logger from "../Logger";
/// END

const networkShadownetWithRpcOctezJs = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const Tezos = new TezosToolkit("https://rpc.tzkt.io/shadownet");
  const wallet = new BeaconWallet({
    name: "Beacon Docs",
    network: {
      type: NetworkType.SHADOWNET,
      rpcUrl: "https://rpc.tzkt.io/shadownet",
    },
  });

  Tezos.setWalletProvider(wallet);

  // Shadownet with different rpcUrl
  try {
    const result = await wallet.client.requestPermissions();
    logger.log("Permissions: ", result);
  } catch (error) {
    logger.log("Error: ", error?.message ?? error);
  }
  /// END
};
export default networkShadownetWithRpcOctezJs;
