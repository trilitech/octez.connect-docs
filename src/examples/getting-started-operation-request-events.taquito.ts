/// START
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import {
  BeaconEvent,
  NetworkType,
  TezosOperationType,
} from "@tezos-x/octez.connect-dapp";
import Logger from "../Logger";
/// END

const getOperationRequestTaquitoWithEvents = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const Tezos = new TezosToolkit("https://rpc.shadownet.teztnets.com");
  const wallet = new BeaconWallet({
    name: "Beacon Docs Taquito",
    network: { type: NetworkType.SHADOWNET },
  });

  Tezos.setWalletProvider(wallet);

  // Check if we are connected. If not, do a permission request first.
  let activeAccount = await wallet.client.getActiveAccount();
  if (!activeAccount) {
    await wallet.client.requestPermissions();
    activeAccount = await wallet.client.getActiveAccount();
  }

  if (activeAccount) {
    // An active account has been set, update the dApp UI
    logger.log(`${BeaconEvent.ACTIVE_ACCOUNT_SET} triggered: `, activeAccount);

    // At this point we are connected to an account.
    // Let's send a simple transaction to the wallet that sends 1 mutez to ourselves.
    try {
      const response = await wallet.client.requestOperation({
        operationDetails: [
          {
            kind: TezosOperationType.TRANSACTION,
            destination: activeAccount.address, // Send to ourselves
            amount: "1", // Amount in mutez, the smallest unit in Tezos
          },
        ],
      });

      logger.log("Response: ", response);
    } catch (error) {
      logger.log("Error: ", error?.message ?? error);
    }
  }

  /// END
};
export default getOperationRequestTaquitoWithEvents;
