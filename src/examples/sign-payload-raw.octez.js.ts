/// START
import { TezosToolkit } from "@tezos-x/octez.js";
import { BeaconWallet } from "@tezos-x/octez.js-dapp-wallet";
import { SigningType } from "@tezos-x/octez.connect-dapp";
import Logger from "../Logger";
/// END

const signPayloadRawOctezJs = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const Tezos = new TezosToolkit("https://rpc.shadownet.teztnets.com");
  const wallet = new BeaconWallet({
    name: "Beacon Docs octez.js",
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
export default signPayloadRawOctezJs;
