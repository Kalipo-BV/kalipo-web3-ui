/* Kalipo B.V. - the DAO platform for business & societal impact 
 * Copyright (C) 2022 Peter Nobels and Matthias van Dijk
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import Vue from 'vue'
import { apiClient, transactions } from '@liskhq/lisk-client';
import { Mnemonic } from '@liskhq/lisk-passphrase';
import * as cryptography from '@liskhq/lisk-cryptography';

Vue.use([apiClient, Mnemonic, cryptography])

export default ({ app }, inject) => {
    const host = window.location.host;
    const domains = host.split(".");

    let server = 'ws://localhost:8080/ws' // default for localhost
    if (domains.length > 2) {
        server = `wss://${host}/ws`;
    }

    // Auth state
    let authAccount = {
        address: null,
        publicKey: null,
        crypt: null
    };

    inject('setAuthAccount', async (authAccountObj) => {
        authAccount = authAccountObj;
    })

    // Client state
    let clientCache;
    const getClient = async () => {
        if (!clientCache) {
            clientCache = await apiClient.createWSClient(server);
        }
        return clientCache;
    };

    inject('invoke', async (action, body) => {
        try {
            const client = await getClient();
            const result = await client.invoke(action, body);
            return { error: false, result: result };
        } catch (error) {
            return { error: true, stack: error };
        }
    });

    // inject('createTransaction', async (moduleId, assetId, asset, passphrase) => {
    //     const client = await getClient();
    //     const publicKey = cryptography.getAddressAndPublicKeyFromPassphrase(passphrase).publicKey

    //     const transactionObject = {
    //         moduleID: moduleId,
    //         assetID: assetId,
    //         nonce: BigInt(0),
    //         fee: BigInt(0),
    //         senderPublicKey: publicKey,
    //         asset: asset
    //     }

    //     const assetSchema = client.schemas.transactionsAssets
    //         .find(s => s.moduleID === moduleId && s.assetID === assetId)
    //     const schema = assetSchema.schema;
    //     const fee = transactions.computeMinFee(schema, transactionObject)

    //     const signedTransaction = await client.transaction.create({
    //         moduleID: moduleId,
    //         assetID: assetId,
    //         fee: BigInt(0),
    //         asset: asset,
    //     }, account.passphrase);

    //     const result = await client.transaction.send(signedTransaction);

    //     return result;
    // })

    inject('createTransaction', async (moduleId, assetId, asset, passphrase) => {
        try {
            const client = await getClient();

            const signedTransaction = await client.transaction.create({
                moduleID: moduleId,
                assetID: assetId,
                fee: BigInt(0),
                asset: asset,
            }, passphrase);

            const result = await client.transaction.send(signedTransaction);
            return { error: false, result: result };

        } catch (error) {
            return { error: true, stack: error };
        }
    })
}