/// START
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { Regions } from "@tezos-x/octez.connect-sdk";
import Logger from "../Logger";
/// END

const differentNodeTaquito = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const Tezos = new TezosToolkit("https://mainnet.api.tez.ie");
  const wallet = new BeaconWallet({
    name: "Beacon Docs Taquito",
    matrixNodes: {
      [Regions.EUROPE_WEST]: ["beacon-node-1.octez.io:8448"],
    },
  });

  Tezos.setWalletProvider(wallet);

  try {
    const permissions = await wallet.client.requestPermissions();
    logger.log("Got permissions:", permissions.address);
  } catch (error) {
    logger.log("Got error:", error.message);
  }

  /// END
};
export default differentNodeTaquito;
