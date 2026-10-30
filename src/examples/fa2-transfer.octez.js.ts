/// START
import { TezosToolkit } from "@tezos-x/octez.js";
import { BeaconWallet } from "@tezos-x/octez.js-dapp-wallet";
import Logger from "../Logger";
import { NetworkType } from "@tezos-x/octez.connect-sdk";
/// END

const fa2TransferOctezJs = async (loggerFun: Function) => {
  const logger = new Logger(loggerFun);
  /// START
  const Tezos = new TezosToolkit("https://rpc.shadownet.teztnets.com");
  const wallet = new BeaconWallet({
    name: "Beacon Docs",
    network: { type: NetworkType.SHADOWNET },
  });

  Tezos.setWalletProvider(wallet);

  const address = await wallet.getPKH();
  if (!address) {
    await wallet.requestPermissions();
  }

  // Connect to a specific contract on the tezos blockchain.
  // Make sure the contract is deployed on the network you requested permissions for.
  const contract = await Tezos.wallet.at(
    "KT1UhW3RdZ6qDMhkCbztVxFFY4eZ8uzfT5aN", // For this example, we use the USDt FA2 contract on Shadownet.
  );

  const TOKEN_ID = 0; // FA2 token id
  const recipient = address; // Send to ourself

  // Call a method on the contract. In this case, we use the transfer entrypoint.
  // octez.js will automatically check if the entrypoint exists and if we call it with the right parameters.
  // In this case the parameters are [from, to, amount].
  // This will prepare the contract call and send the request to the connected wallet.
  try {
    const result = await (contract as any).methods
      .transfer([
        {
          from_: address,
          txs: [
            {
              to_: recipient,
              token_id: TOKEN_ID,
              amount: 1,
            },
          ],
        },
      ])
      .send();
    // As soon as the operation is broadcasted, you will receive the operation hash
    logger.log("Operation hash: ", result.opHash);
  } catch (error) {
    logger.log("Error: ", error?.message ?? error);
  }
  /// END
};
export default fa2TransferOctezJs;
