/// START
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import Logger from "../Logger";
import { NetworkType } from "@tezos-x/octez.connect-sdk";
/// END

const disconnectWalletTaquito = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const Tezos = new TezosToolkit("https://rpc.shadownet.teztnets.com");
  const wallet = new BeaconWallet({
    name: "Beacon Docs Taquito",
    network: { type: NetworkType.SHADOWNET },
  });

  Tezos.setWalletProvider(wallet);

  await wallet.clearActiveAccount();

  try {
    const account = await wallet.getPKH();
    logger.log("Active Account", account);
  } catch {
    logger.log("No wallet connected");
  }

  /// END
};
export default disconnectWalletTaquito;
