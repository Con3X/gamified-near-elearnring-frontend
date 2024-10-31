import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupNightly } from "@near-wallet-selector/nightly";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { login } from "../utils/ProviderAuth";
import Swal from "sweetalert2";

/**
 * Setting up model for wallet-selector Add the required wallets and network and select lang
 */
export const selector = await setupWalletSelector({
  network: "testnet",
  languageCode: "en",
  modules: [
    setupNightly(),
    setupMeteorWallet(),
    // TODO: add the setup for HereWallet once the related issue is resolved: https://github.com/here-wallet/js-sdk/issues/4
    // setupHereWallet(),
  ],
});

export const modal = setupModal(selector, {});

// TODO: refactor once of those issues are done: https://github.com/near/wallet-selector/issues/1223 or https://github.com/near/wallet-selector/issues/1224
function appendPrivacyPolicyText() {
  const tryAppendingTextNode = setInterval(() => {
    try {
      const privacyPolicy = document.createElement("div");
      privacyPolicy.className = "privacy-policy-div";
      privacyPolicy.innerHTML =
        '<b style="color:red;">By using our service you automatically acknowledge and agree to our <a href="/privacy-policy">Privacy Policy</a> \
and our <a href="/legal-disclaimer">Legal Disclaimer</a>.</b>';
      const wrapper = document.getElementsByClassName("nws-modal-body")[0];
      // const style = document.createElement("style");
      // style.innerHTML = ".modal-right {padding-top:6px:} ";
      if (wrapper) {
        if (
          document.getElementsByClassName("privacy-policy-div").length === 0
        ) {
          // document.head.appendChild(style);
          wrapper.append(privacyPolicy);
        }
        clearInterval(tryAppendingTextNode); // Stop trying if successful
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, 200);
}

async function retryUntilSuccess(
  fn,
  shouldAbort,
  maxAttempts = 100,
  delay = 1000
) {
  let attempts = 0;
  let shouldAbortOnNextFail = false;
  while (attempts < maxAttempts) {
    try {
      // Check if the operation should be aborted
      if (shouldAbort()) {
        shouldAbortOnNextFail = true;
      }

      return await fn();
    } catch (error) {
      attempts++;
      console.log(`Attempt ${attempts} failed: ${error.message}`);

      if (shouldAbortOnNextFail) {
        console.log(`Attempts aborted!`);
        return;
      }

      if (attempts >= maxAttempts) {
        console.log("Max attempts reached. Giving up.");
        throw error; // Re-throw the exception if max attempts are reached
      }

      // Wait for the specified delay before the next attempt
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

/**
 * This is the general function that the application will work on and is linked to the connect button.
 * src connect button is `src/sections/Header/v2/Header.jsx`
 * @method show  displays the frame for selecting the governorate.
 * @method getAccounts Extracts wallet addresses to link to.
 */
export const handleNearLogin = async (navigate, setButtonText, setIsValid) => {
  try {
    modal.show();
    appendPrivacyPolicyText();

    console.log("Connecting...");

    let stopWaitingForWallet = false;
    modal.on("onHide", () => {
      stopWaitingForWallet = true;
    });

    const wallet = await retryUntilSuccess(
      async () => await selector.wallet(),
      () => stopWaitingForWallet,
      1000,
      500
    );
    if (!wallet) {
      return;
    }

    setButtonText("Processing");

    const accounts = await wallet.getAccounts();
    const accountId = accounts[0]?.accountId;
    const publicKey = accounts[0]?.publicKey;

    if (!accountId) {
      throw new Error("No account found in wallet");
    }

    /**
     * Checking for signature in localStorage If it exists, skip this step, otherwise register a new signature in localstorage after Sign message in wallet.
     * step 1
     */

    const storedData = localStorage.getItem("nearSignature");
    if (!storedData || JSON.parse(storedData).accountId !== accountId) {
      const localMessage = process.env.REACT_APP_LOCAL_MESSAGE;
      const nonceHex = process.env.REACT_APP_NONCE;
      const nonce = Buffer.from(nonceHex.replace(/^0x/, ""), "hex");
      localStorage.setItem("firstLogin", "true");
      if (nonce.length !== 32) {
        throw new Error("Invalid nonce length. It must be exactly 32 bytes.");
      }

      setButtonText("Sign");

      const { signature } = await wallet.signMessage({
        message: localMessage,
        nonce: nonce,
        recipient: accountId,
      });

      console.log("user has signed the local message", signature);

      localStorage.setItem(
        "nearSignature",
        JSON.stringify({
          accountId: accountId,
          signature: signature,
        })
      );
    }

    /**
     * Get Message and Nonce from Backend and Sign message in wallet
     * step 2
     */

    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/auth/challenge`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const challengeMessage = data.message;
    const backendNonce = data.challenge;

    setButtonText("Login");

    //Sign message from Backend
    const { signature: backendSignature } = await wallet.signMessage({
      message: challengeMessage,
      nonce: Buffer.from(backendNonce, "base64"),
      recipient: accountId,
    });
    console.log("user has signed the backend message", backendSignature);

    /**
     * Send data to the back end, receive the token and save it in the local storage by react-token-auth library
     * step 3
     */
    //Send Data To Backend
    const verifyResponse = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountId: accountId,
          publicKey: publicKey,
          challenge: backendNonce,
          message: challengeMessage,
          signature: backendSignature,
        }),
      }
    );

    if (verifyResponse.status === 201) {
      const verifyData = await verifyResponse.json();
      const jwtToken = verifyData.data.authenticate.token;
      login(jwtToken);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Registration has been completed successfully.!",
      });
      if (localStorage.getItem("firstLogin") === "true") {
        navigate("/wizard");
      } else {
        setButtonText("Connected");
        setIsValid(true);
        navigate("/");
      }
      modal.hide();
    } else {
      console.log("Signature verification failed");
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error while trying to register. Please Try again.",
      });
    }
  } catch (error) {
    console.error("Operation error : ", error.message);
  }
};

export const handleNearLogout = async () => {
  try {
    const wallet = await selector.wallet();
    await wallet.signOut();

    window.location.replace("/");
  } catch (error) {
    console.error("Logout error: ", error.message);
  }
};

/*
import { setupBitgetWallet } from "@near-wallet-selector/bitget-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupNearSnap } from "@near-wallet-selector/near-snap";
import { setupMathWallet } from "@near-wallet-selector/math-wallet";
import { setupOkxWallet } from "@near-wallet-selector/okx-wallet";
import { setupNarwallets } from "@near-wallet-selector/narwallets";
import { setupWelldoneWallet } from "@near-wallet-selector/welldone-wallet";
import { setupLedger } from "@near-wallet-selector/ledger";
import { setupWalletConnect } from "@near-wallet-selector/wallet-connect";
import { setupNearFi } from "@near-wallet-selector/nearfi";
import { setupCoin98Wallet } from "@near-wallet-selector/coin98-wallet";
import { setupNeth } from "@near-wallet-selector/neth";
import { setupXDEFI } from "@near-wallet-selector/xdefi";
import { setupRamperWallet } from "@near-wallet-selector/ramper-wallet";
import { setupNearMobileWallet } from "@near-wallet-selector/near-mobile-wallet"; 
import { setupMintbaseWallet } from "@near-wallet-selector/mintbase-wallet"; 
import { setupBitteWallet } from "@near-wallet-selector/bitte-wallet";
import { setupEthereumWallets } from "@near-wallet-selector/ethereum-wallets";

export async function getAccountDetails() {
  const wallet = await selector.wallet();
  const accounts = await wallet.getAccounts();

  if (accounts.length === 0) throw new Error('No account found.');

  return accounts[0];
}

*/
/*
import { setupWalletSelector, WalletSelector  } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import "@near-wallet-selector/modal-ui/styles.css"

let selector: WalletSelector ;

export async function initNear() {
  selector = await setupWalletSelector ({
    network: "testnet", // or 'mainnet'
    modules: [setupMyNearWallet()],
  });

  const modal = setupModal(selector,null);
  modal.show();
}

export async function getAccountDetails() {
  const wallet = await selector.wallet();
  const accounts = await wallet.getAccounts();

  if (accounts.length === 0) throw new Error('No account found.');

  return accounts[0];
}
/*
export async function signAndSendChallenge(accountId: string, challenge: string) {
  const wallet = await selector.wallet();
  const signedMessage = await wallet.signAndSendTransaction({
    signerId: accountId,
    receiverId: 'your-backend-url-here',
    actions: [{
      type: 'FunctionCall',
      params: {
        methodName: 'verifyChallenge',
        args: { challenge },
        gas: '300000000000000',
      },
    }],
  });

  return signedMessage;
}
*/
