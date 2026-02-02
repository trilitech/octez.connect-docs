/// START
import { TezosToolkit } from "@tezos-x/octez.js";
import { BeaconWallet } from "@tezos-x/octez.js-dapp-wallet/dist/octez.js-beacon-wallet.es6.js";
import { SigningType } from "@tezos-x/octez.connect-sdk";
import Logger from "../Logger";
/// END

const signPayloadOperationTaquito = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const Tezos = new TezosToolkit("https://mainnet.api.tez.ie");
  const wallet = new BeaconWallet({ name: "Beacon Docs Taquito" });

  Tezos.setWalletProvider(wallet);
  try {
    const response = await wallet.client.requestSignPayload({
      signingType: SigningType.OPERATION,
      payload: "0300", // This hex string needs to be prefixed with 03
    });

    logger.log(`Signature: ${response.signature}`);
  } catch (error) {
    logger.log("Error: ", error.message);
  }
  /// END
};
export default signPayloadOperationTaquito;
