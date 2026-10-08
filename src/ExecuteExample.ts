import broadcastRequestBeacon from "./examples/broadcast-request.octez.connect";
import broadcastRequestOctezJs from "./examples/broadcast-request.octez.js";
import destroyBeacon from "./examples/destroy.octez.connect";
import destroyOctezJs from "./examples/destroy.octez.js";
import differentNodeBeacon from "./examples/different-node.octez.connect";
import differentNodeOctezJs from "./examples/different-node.octez.js";
import disableUIBeacon from "./examples/disable-all-ui.octez.connect";
import disableUIOctezJs from "./examples/disable-all-ui.octez.js";
import disconnectWalletBeacon2 from "./examples/disconnect-wallet-2.octez.connect";
import disconnectWalletOctezJs2 from "./examples/disconnect-wallet-2.octez.js";
import disconnectWalletBeacon from "./examples/disconnect-wallet.octez.connect";
import disconnectWalletOctezJs from "./examples/disconnect-wallet.octez.js";
import exampleAdvancedBeacon from "./examples/example-advanced.octez.connect";
import exampleAdvancedOctezJs from "./examples/example-advanced.octez.js";
import exampleSimpleBeacon from "./examples/example-simple.octez.connect";
import exampleSimpleOctezJs from "./examples/example-simple.octez.js";
import fa12TransferOctezJs from "./examples/fa1.2-transfer.octez.js";
import fa2TransferOctezJs from "./examples/fa2-transfer.octez.js";
import getActiveAccountBeaconWithEvents from "./examples/getting-started-active-account-events.octez.connect";
import getActiveAccountOctezJsWithEvents from "./examples/getting-started-active-account-events.octez.js";
import getActiveAccountBeacon from "./examples/getting-started-active-account.octez.connect";
import getActiveAccountOctezJs from "./examples/getting-started-active-account.octez.js";
import getOperationRequestBeaconWithEvents from "./examples/getting-started-operation-request-events.octez.connect";
import getOperationRequestOctezJsWithEvents from "./examples/getting-started-operation-request-events.octez.js";
import requestOperationBeacon from "./examples/getting-started-operation-request.octez.connect";
import requestOperationOctezJs from "./examples/getting-started-operation-request.octez.js";
import requestPermissionsBeacon from "./examples/getting-started-permission-request.octez.connect";
import requestPermissionsOctezJs from "./examples/getting-started-permission-request.octez.js";
import infoConnectionBeacon from "./examples/info-connection.octez.connect";
import infoConnectionOctezJs from "./examples/info-connection.octez.js";
import infoVersionBeacon from "./examples/info-version.octez.connect";
import infoVersionOctezJs from "./examples/info-version.octez.js";
import networkCustomBeacon from "./examples/network-custom-network.octez.connect";
import networkCustomOctezJs from "./examples/network-custom-network.octez.js";
import networkShadownetWithRpcBeacon from "./examples/network-shadownet-with-url.octez.connect";
import networkShadownetWithRpcOctezJs from "./examples/network-shadownet-with-url.octez.js";
import networkShadownetBeacon from "./examples/network-shadownet.octez.connect";
import networkShadownetOctezJs from "./examples/network-shadownet.octez.js";
import networkMainnetWithUrlBeacon from "./examples/network-mainnet-with-url.octez.connect";
import networkMainnetWithUrlOctezJs from "./examples/network-mainnet-with-url.octez.js";
import overrideAlertAbortedBeacon from "./examples/override-alert-aborted-handler.octez.connect";
import overrideAlertAbortedOctezJs from "./examples/override-alert-aborted-handler.octez.js";
import overrideDefaultEventBeacon from "./examples/override-default-event.octez.connect";
import overrideDefaultEventOctezJs from "./examples/override-default-event.octez.js";
import signPayloadMichelineBeacon from "./examples/sign-payload-micheline.octez.connect";
import signPayloadMichelineOctezJs from "./examples/sign-payload-micheline.octez.js";
import signPayloadOperationBeacon from "./examples/sign-payload-operation.octez.connect";
import signPayloadOperationOctezJs from "./examples/sign-payload-operation.octez.js";
import signPayloadRawBeacon from "./examples/sign-payload-raw.octez.connect";
import signPayloadRawOctezJs from "./examples/sign-payload-raw.octez.js";
import simpleContractCallBeacon from "./examples/simple-contract-call.octez.connect";
import simpleContractCallOctezJs from "./examples/simple-contract-call.octez.js";
import subscribeToEventBeacon from "./examples/subscribe-to-event.octez.connect";
import subscribeToEventOctezJs from "./examples/subscribe-to-event.octez.js";

export class ExecuteExample {
  private static wasHandlerInitialized = false;

  static async execute(code: string, updateLogs: Function) {
    try {
      await this.executeExample(code, updateLogs);
    } catch (error) {
      updateLogs(error?.message ?? error);
    }
  }

  private static setUpHandler() {
    if (this.wasHandlerInitialized) {
      return;
    }

    window.addEventListener("error", function (e) {
      const message = (e as any)?.error?.message ?? (e as any)?.message;
      console.error("Error occurred:", message ?? e);
    });

    window.addEventListener("unhandledrejection", function (e) {
      const message = (e as any)?.reason?.message ?? (e as any)?.reason;
      console.error("Unhandled rejection:", message ?? e);
    });

    this.wasHandlerInitialized = true;
  }

  private static async executeExample(code: string, updateLogs: Function) {
    this.setUpHandler();
    switch (code) {
      case "beacon permission request":
        await requestPermissionsBeacon(updateLogs);
        break;
      case "octez.js permission request":
        await requestPermissionsOctezJs(updateLogs);
        break;
      case "beacon get active account":
        await getActiveAccountBeacon(updateLogs);
        break;
      case "octez.js get active account":
        await getActiveAccountOctezJs(updateLogs);
        break;
      case "beacon get active account with events":
        await getActiveAccountBeaconWithEvents(updateLogs);
        break;
      case "octez.js get active account with events":
        await getActiveAccountOctezJsWithEvents(updateLogs);
        break;
      case "beacon request operation":
        await requestOperationBeacon(updateLogs);
        break;
      case "octez.js request operation":
        await requestOperationOctezJs(updateLogs);
        break;
      case "beacon request operation with events":
        await getOperationRequestBeaconWithEvents(updateLogs);
        break;
      case "octez.js request operation with events":
        await getOperationRequestOctezJsWithEvents(updateLogs);
        break;
      case "beacon advanced example":
        await exampleAdvancedBeacon(updateLogs);
        break;
      case "octez.js advanced example":
        await exampleAdvancedOctezJs(updateLogs);
        break;
      case "beacon simple example":
        await exampleSimpleBeacon(updateLogs);
        break;
      case "octez.js simple example":
        await exampleSimpleOctezJs(updateLogs);
        break;
      case "beacon disconnect wallet":
        await disconnectWalletBeacon(updateLogs);
        break;
      case "octez.js disconnect wallet":
        await disconnectWalletOctezJs(updateLogs);
        break;
      case "beacon destroy":
        await destroyBeacon(updateLogs);
        break;
      case "octez.js destroy":
        await destroyOctezJs(updateLogs);
        break;
      case "beacon disconnect wallet 2":
        await disconnectWalletBeacon2(updateLogs);
        break;
      case "octez.js disconnect wallet 2":
        await disconnectWalletOctezJs2(updateLogs);
        break;
      case "beacon broadcast request":
        await broadcastRequestBeacon(updateLogs);
        break;
      case "octez.js broadcast request":
        await broadcastRequestOctezJs(updateLogs);
        break;
      case "beacon simple contract call":
        await simpleContractCallBeacon(updateLogs);
        break;
      case "octez.js simple contract call":
        await simpleContractCallOctezJs(updateLogs);
        break;
      case "octez.js fa1.2 transfer":
        await fa12TransferOctezJs(updateLogs);
        break;
      case "octez.js fa2 transfer":
        await fa2TransferOctezJs(updateLogs);
        break;
      case "beacon subscribe to event":
        await subscribeToEventBeacon(updateLogs);
        break;
      case "octez.js subscribe to event":
        await subscribeToEventOctezJs(updateLogs);
        break;
      case "beacon mainnet network":
        await networkMainnetWithUrlBeacon(updateLogs);
        break;
      case "octez.js mainnet network":
        await networkMainnetWithUrlOctezJs(updateLogs);
        break;
      case "beacon shadownet network":
        await networkShadownetBeacon(updateLogs);
        break;
      case "octez.js shadownet network":
        await networkShadownetOctezJs(updateLogs);
        break;
      case "beacon shadownet network with RPC":
        await networkShadownetWithRpcBeacon(updateLogs);
        break;
      case "octez.js shadownet network with RPC":
        await networkShadownetWithRpcOctezJs(updateLogs);
        break;
      case "beacon custom network":
        await networkCustomBeacon(updateLogs);
        break;
      case "octez.js custom network":
        await networkCustomOctezJs(updateLogs);
        break;
      case "beacon sign payload micheline":
        await signPayloadMichelineBeacon(updateLogs);
        break;
      case "octez.js sign payload micheline":
        await signPayloadMichelineOctezJs(updateLogs);
        break;
      case "beacon sign payload operation":
        await signPayloadOperationBeacon(updateLogs);
        break;
      case "octez.js sign payload operation":
        await signPayloadOperationOctezJs(updateLogs);
        break;
      case "beacon sign payload raw":
        await signPayloadRawBeacon(updateLogs);
        break;
      case "octez.js sign payload raw":
        await signPayloadRawOctezJs(updateLogs);
        break;
      case "beacon disable ui":
        await disableUIBeacon(updateLogs);
        break;
      case "octez.js disable ui":
        await disableUIOctezJs(updateLogs);
        break;
      case "beacon request permission events":
        await overrideDefaultEventBeacon(updateLogs);
        break;
      case "octez.js request permission events":
        await overrideDefaultEventOctezJs(updateLogs);
        break;
      case "beacon request permission alert":
        await overrideAlertAbortedBeacon(updateLogs);
        break;
      case "octez.js request permission alert":
        await overrideAlertAbortedOctezJs(updateLogs);
        break;
      case "beacon different node":
        await differentNodeBeacon(updateLogs);
        break;
      case "octez.js different node":
        await differentNodeOctezJs(updateLogs);
        break;
      case "beacon sdk version":
        await infoVersionBeacon(updateLogs);
        break;
      case "octez.js sdk version":
        await infoVersionOctezJs(updateLogs);
        break;
      case "beacon sdk client":
        await infoVersionBeacon(updateLogs);
        break;
      case "octez.js sdk client":
        await infoVersionOctezJs(updateLogs);
        break;
      case "beacon sdk connection":
        await infoConnectionBeacon(updateLogs);
        break;
      case "octez.js sdk connection":
        await infoConnectionOctezJs(updateLogs);
        break;
      default:
        break;
    }
  }
}
