import Vue from 'vue'
import { apiClient, transactions } from '@liskhq/lisk-client';
import { Mnemonic } from '@liskhq/lisk-passphrase';
import * as cryptography from '@liskhq/lisk-cryptography';

Vue.use([apiClient, Mnemonic, cryptography])

export default ({ app }, inject) => {
    const host = window.location.host;
    const domains = host.split(".");

    let server = 'wss://2.kalipo.dev/ws' // default for localhost
    if (domains.length > 2) {
        server = `wss://${host}/ws`;
    }

    let clientCache;
    const getClient = async () => {
        if (!clientCache) {
            clientCache = await apiClient.createWSClient(server);
        }
        return clientCache;
    };

    inject('invoke', async (action, body) => {
        const client = await getClient();
        const result = await client.invoke(action, body);
        return result;
    });

    inject('createTransaction', async (moduleId, assetId, asset, passphrase) => {
        const client = await getClient();
        const publicKey = cryptography.getAddressAndPublicKeyFromPassphrase(passphrase).publicKey

        const transactionObject = {
            moduleID: moduleId,
            assetID: assetId,
            nonce: BigInt(0),
            fee: BigInt(0),
            senderPublicKey: publicKey,
            asset: asset
        }

        const assetSchema = client.schemas.transactionsAssets
            .find(s => s.moduleID === moduleId && s.assetID === assetId)
        const schema = assetSchema.schema;
        const fee = transactions.computeMinFee(schema, transactionObject)

        const signedTransaction = await client.transaction.create({
            moduleID: moduleId,
            assetID: assetId,
            fee: BigInt(0),
            asset: asset,
        }, account.passphrase);

        const result = await client.transaction.send(signedTransaction);

        return result;
    })

    inject('createTransaction', async (moduleId, assetId, asset, passphrase) => {
        const client = await getClient();

        const signedTransaction = await client.transaction.create({
            moduleID: moduleId,
            assetID: assetId,
            fee: BigInt(0),
            asset: asset,
        }, passphrase);

        const result = await client.transaction.send(signedTransaction);
        return result;
    })
}