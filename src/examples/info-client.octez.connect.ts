/// START
import { DAppClient, NetworkType } from "@tezos-x/octez.connect-sdk";
import Logger from "../Logger";
/// END

const infoClientBeacon = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const dAppClient = new DAppClient({
    name: "Beacon Docs",
    network: { type: NetworkType.SHADOWNET },
  });

  logger.log(`Connected Accounts:`, await dAppClient.getAccounts());
  logger.log(`Connected Peers:`, await dAppClient.getPeers());
  /// END
};
export default infoClientBeacon;
