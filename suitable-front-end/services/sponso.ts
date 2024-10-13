import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { fromBase64 } from "@mysten/sui/utils";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { useEnokiFlow } from "@mysten/enoki/react";
import { EnokiClient, EnokiFlow } from "@mysten/enoki";
import { sponso_private_key } from "@/environment/sponso";

const privKeyArray = Array.from(fromBase64(sponso_private_key));
const scheme = privKeyArray.shift();

export async function executeSponsoTx(tx: Transaction, suiClient: SuiClient, enokiFlow: EnokiFlow) {
    const sponso_keypair = Ed25519Keypair.fromSecretKey(Uint8Array.from(privKeyArray));
    const sender = await enokiFlow.getKeypair();

    console.log("User connected - Public key:", sender.getPublicKey().toSuiAddress());
    console.log("Sponso enabled - Public key:", sponso_keypair.getPublicKey().toSuiAddress());

    tx.setSender(sender.toSuiAddress());
    tx.setGasOwner(sponso_keypair.toSuiAddress());

    tx.setGasBudget(5000000);

    let bytes = await tx.build({
        client: suiClient,
        // onlyTransactionKind: true,
    });

    let signSender = await sender.signTransaction(bytes);
    let signGasOwner = await sponso_keypair.signTransaction(bytes);


    const response = await suiClient.executeTransactionBlock({
        transactionBlock: bytes,
        signature: [signGasOwner.signature, signSender.signature],
        options: {
            showEffects: true
        }
    });

    return response;
}