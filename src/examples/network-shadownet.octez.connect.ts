/// START
import { DAppClient, NetworkType } from "@tezos-x/octez.connect-sdk";
import Logger from "../Logger";
/// END

const networkShadownetBeacon = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const dAppClient = new DAppClient({
    name: "Beacon Docs",
    network: { type: NetworkType.SHADOWNET },
  });

  // Shadownet with default rpcUrl
  try {
    const result = await dAppClient.requestPermissions();
    logger.log("Permissions: ", result);
  } catch (error) {
    logger.log("Error: ", error?.message ?? error);
  }
  /// END
};
export default networkShadownetBeacon;
