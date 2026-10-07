/// START
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@tezos-x/octez.connect-dapp";
import Logger from "../Logger";
/// END

const networkMainnetWithUrlTaquito = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const Tezos = new TezosToolkit("https://rpc.tzbeta.net");
  const wallet = new BeaconWallet({
    name: "Beacon Docs Taquito",
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
export default networkMainnetWithUrlTaquito;
