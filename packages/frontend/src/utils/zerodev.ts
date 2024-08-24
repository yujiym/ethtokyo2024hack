import {
  createKernelAccount,
  createKernelAccountClient,
  createZeroDevPaymasterClient,
} from "@zerodev/sdk";
import {
  WebAuthnMode,
  toPasskeyValidator,
  toWebAuthnKey,
} from "@zerodev/passkey-validator";
import { toPermissionValidator } from "@zerodev/permissions";
import { toECDSASigner } from "@zerodev/permissions/signers";
import { toSudoPolicy } from "@zerodev/permissions/policies";
import { bundlerActions, ENTRYPOINT_ADDRESS_V07 } from "permissionless";
import { useState } from "react";
import { createPublicClient, http, parseAbi, encodeFunctionData } from "viem";
import { sepolia } from "viem/chains";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { KERNEL_V3_1 } from "@zerodev/sdk/constants";

const kernelVersion = KERNEL_V3_1;

const BUNDLER_URL = `https://rpc.zerodev.app/api/v2/bundler/${process.env.NEXT_PUBLIC_ZERODEV_KEY}`;
const PAYMASTER_URL = `https://rpc.zerodev.app/api/v2/paymaster/${process.env.NEXT_PUBLIC_ZERODEV_KEY}`;
const PASSKEY_SERVER_URL = `https://passkeys.zerodev.app/api/v3/${process.env.NEXT_PUBLIC_ZERODEV_KEY}`;

const CHAIN = sepolia;

const contractAddress = "0x34bE7f35132E97915633BC1fc020364EA5134863";
const contractABI = parseAbi([
  "function mint(address _to) public",
  "function balanceOf(address owner) external view returns (uint256 balance)",
]);
const sessionPrivateKey = generatePrivateKey();
const sessionKeySigner = privateKeyToAccount(sessionPrivateKey);

const publicClient = createPublicClient({
  transport: http(BUNDLER_URL),
});

let sessionKeyAccount: any;
let kernelClient: any;

export const createAccountAndClient = async (passkeyValidator: any) => {
  const ecdsaSigner = await toECDSASigner({
    signer: sessionKeySigner,
  });

  const sudoPolicy = await toSudoPolicy({});

  const permissionValidator = await toPermissionValidator(publicClient, {
    signer: ecdsaSigner,
    policies: [sudoPolicy],
    entryPoint: ENTRYPOINT_ADDRESS_V07,
    kernelVersion,
  });

  sessionKeyAccount = await createKernelAccount(publicClient, {
    entryPoint: ENTRYPOINT_ADDRESS_V07,
    kernelVersion,
    plugins: {
      sudo: passkeyValidator,
      regular: permissionValidator,
    },
  });

  kernelClient = createKernelAccountClient({
    account: sessionKeyAccount,
    chain: CHAIN,
    bundlerTransport: http(BUNDLER_URL),
    entryPoint: ENTRYPOINT_ADDRESS_V07,
    middleware: {
      sponsorUserOperation: async ({ userOperation }) => {
        const zeroDevPaymaster = await createZeroDevPaymasterClient({
          chain: CHAIN,
          transport: http(PAYMASTER_URL),
          entryPoint: ENTRYPOINT_ADDRESS_V07,
        });
        return zeroDevPaymaster.sponsorUserOperation({
          userOperation,
          entryPoint: ENTRYPOINT_ADDRESS_V07,
        });
      },
    },
  });

  setIsKernelClientReady(true);
  setAccountAddress(sessionKeyAccount.address);
};

export const handleRegister = async (username) => {
  console.log("Registering with username:", username);
  setIsRegistering(true);

  const webAuthnKey = await toWebAuthnKey({
    passkeyName: username,
    passkeyServerUrl: PASSKEY_SERVER_URL,
    mode: WebAuthnMode.Register,
  });

  const passkeyValidator = await toPasskeyValidator(publicClient, {
    webAuthnKey,
    passkeyServerUrl: PASSKEY_SERVER_URL,
    entryPoint: ENTRYPOINT_ADDRESS_V07,
    kernelVersion,
  });

  await createAccountAndClient(passkeyValidator);

  setIsRegistering(false);
  window.alert("Register done.  Try sending UserOps.");
};
