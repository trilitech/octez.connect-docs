/// START
import { TezosToolkit } from "@tezos-x/octez.js";
import { BeaconWallet } from "@tezos-x/octez.js-dapp-wallet";
import { PermissionScope } from "@tezos-x/octez.connect-dapp";
import { NetworkType } from "@tezos-x/octez.connect-sdk";
/// END

async () => {
  /// START
  const Tezos = new TezosToolkit("https://rpc.shadownet.teztnets.com");
  const wallet = new BeaconWallet({
    name: "Beacon Docs octez.js",
    network: { type: NetworkType.SHADOWNET },
  });

  Tezos.setWalletProvider(wallet);

  // You can request specific permissions if you want
  const scopes: PermissionScope[] = [
    PermissionScope.OPERATION_REQUEST,
    PermissionScope.SIGN,
  ];

  try {
    const permissions = await wallet.client.requestPermissions({ scopes });
    console.log("Got permissions:", permissions.address);
  } catch (error) {
    console.log("Got error:", error?.message ?? error);
  }

  /// END
};
