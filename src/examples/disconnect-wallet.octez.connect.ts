/// START
import Logger from "../Logger";
import { DAppClient } from "@tezos-x/octez.connect-sdk";
/// END

const disconnectWalletBeacon = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const dAppClient = new DAppClient({ name: "Beacon Docs" });

  dAppClient.clearActiveAccount().then(async () => {
    const account = await dAppClient.getActiveAccount();

    logger.log("Active Account", account);
  });
  /// END
};
export default disconnectWalletBeacon;
