/// START
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@tezos-x/octez.connect-dapp";
import Logger from "../Logger";
/// END

const networkCustomTaquito = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const Tezos = new TezosToolkit("https://rpc.shadownet.teztnets.com");
  const wallet = new BeaconWallet({
    name: "Beacon Docs Taquito",
    network: {
      type: NetworkType.CUSTOM,
      // e.g. a local node at "http://localhost:8732". Here we point to a public
      // Shadownet RPC so the example can be run as-is.
      name: "Shadownet (custom)",
      rpcUrl: "https://rpc.shadownet.teztnets.com",
    },
  });

  Tezos.setWalletProvider(wallet);

  // Custom network (eg. local development or latest testnet).
  // Not every wallet supports custom networks.
  try {
    const result = await wallet.client.requestPermissions();
    logger.log("Permissions: ", result);
  } catch (error) {
    logger.log("Error: ", error?.message ?? error);
  }
  /// END
};
export default networkCustomTaquito;
