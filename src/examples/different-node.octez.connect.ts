/// START
import { DAppClient, NetworkType, Regions } from "@tezos-x/octez.connect-sdk";
import Logger from "../Logger";
/// END

const differentNodeBeacon = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const dAppClient = new DAppClient({
    name: "Beacon Docs",
    network: { type: NetworkType.SHADOWNET },
    matrixNodes: {
      [Regions.EUROPE_WEST]: ["beacon-node-1.octez.io:8448"],
    },
  });

  try {
    logger.log("Requesting permissions...");
    const permissions = await dAppClient.requestPermissions();
    logger.log("Got permissions:", permissions.address);
  } catch (error) {
    logger.log("Got error:", error?.message ?? error);
  }
  /// END
};
export default differentNodeBeacon;
