/// START
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType, SigningType } from "@tezos-x/octez.connect-dapp";
import Logger from "../Logger";
/// END

const signPayloadRawTaquito = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const Tezos = new TezosToolkit("https://rpc.shadownet.teztnets.com");
  const wallet = new BeaconWallet({
    name: "Beacon Docs Taquito",
    network: { type: NetworkType.SHADOWNET },
  });

  Tezos.setWalletProvider(wallet);

  try {
    const response = await wallet.client.requestSignPayload({
      signingType: SigningType.RAW,
      payload: "any string that will be signed",
    });

    logger.log(`Signature: ${response.signature}`);
  } catch (error) {
    logger.log("Result: ", error?.message ?? error);
  }
  /// END
};
export default signPayloadRawTaquito;
