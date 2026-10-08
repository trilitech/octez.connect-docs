/// START
import {
  DAppClient,
  NetworkType,
  SigningType,
} from "@tezos-x/octez.connect-sdk";
import Logger from "../Logger";
/// END

const signPayloadOperationBeacon = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const dAppClient = new DAppClient({
    name: "Beacon Docs",
    network: { type: NetworkType.SHADOWNET },
  });

  try {
    const response = await dAppClient.requestSignPayload({
      signingType: SigningType.OPERATION,
      payload: "0300", // This hex string needs to be prefixed with 03
    });

    logger.log(`Signature: ${response.signature}`);
  } catch (error) {
    logger.log("Error: ", error?.message ?? error);
  }
  /// END
};
export default signPayloadOperationBeacon;
