/// START
import { BEACON_VERSION, SDK_VERSION } from "@airgap/beacon-dapp";
import Logger from "../Logger";
/// END

const infoVersionTaquito = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  logger.log("SDK Version", SDK_VERSION);
  logger.log("Beacon Version", BEACON_VERSION);
  /// END
};
export default infoVersionTaquito;
