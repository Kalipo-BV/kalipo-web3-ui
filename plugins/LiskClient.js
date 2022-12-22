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

// TODO: refactor to LiskClient2 current version has a lot of expiremental snippets,
// rewrite wallet logic to make more sense and have a decent structure
// make the connection and error handling easy to catch in child components

import Vue from 'vue'
// import lisk from '@liskhq/lisk-client';
import { apiClient, transactions } from '@liskhq/lisk-client';
import { Mnemonic } from '@liskhq/lisk-passphrase';
import * as cryptography from '@liskhq/lisk-cryptography';

Vue.use([apiClient, Mnemonic, cryptography])
const createTransaction = async (
    moduleId,
    assetId,
    assets,
    account,
    client,
) => {
    console.log(account)
    const { publicKey } = account
    const transactionObject = {
        moduleID: moduleId,
        assetID: assetId,
        nonce: BigInt(0),
        fee: BigInt(0),
        senderPublicKey: publicKey,
        asset: {
            ...assets
        }
    }

    //transactions.convertLSKToBeddows('0.01')
    const assetSchema = client.schemas.transactionsAssets
        .find(s => s.moduleID === moduleId && s.assetID === assetId)
    const schema = assetSchema.schema;
    console.log(schema)
    console.log(transactionObject)
    const fee = transactions.computeMinFee(schema, transactionObject)
    // if (getFee) {
    //     return transactions.convertBeddowsToLSK(fee.toString())
    // }
    let signedTransaction, tx;
    console.log(account)
    if (moduleId !== 6666) {
        tx = await client.transaction.create({
            moduleID: moduleId,
            assetID: assetId,
            fee: BigInt(0),
            asset: {
                ...assets
            },
        }, account.passphrase);
    } else {

        signedTransaction = transactions.signTransaction(
            schema,
            { ...transactionObject, fee },
            new Buffer.from(client._nodeInfo.networkIdentifier, 'hex'),
            account.passphrase,
        )
    }
    let result = {
        success: false,
        message: null,
    };
    try {
        result.success = true;
        if (moduleId === 6666) {
            const { id, ...rest } = signedTransaction;
            result.message = await client.transaction.send(codec.codec.fromJSON(getFullAssetSchema(schema), rest))
        } else {
            result.message = await client.transaction.send(tx)
        }
    } catch ({ message }) {
        result.success = false;
        result.message = message;
    }
    return result;
}

export default ({ app }, inject) => {
    const server = 'wss://9.kalipo.dev/ws'

    let client;

    // const authAccount = {
    //     address: this.account.address,
    //     publicKey: this.account.publicKey,
    //     crypt: decryptToLayerOneStr
    // }
    let authAccount = {
        address: null,
        publicKey: null,
        crypt: null
    };
    const getClient = async (reconnect) => {
        try {
            if (!client || reconnect) {
                client = await apiClient.createWSClient(server)
                // client.subscribe("accountCreation:new", (data) => {
                //     console.log("accountCreation:new")
                //     console.log(data)
                // }
                // client.subscribe("app:block:new", (data) => {
                //     console.log("app:block:new")
                //     console.log(data)
                // })
            }
            return { error: false, client: client };
        } catch (error) {
            return { error: true, error: error };
        }
    }

    inject('client', async () => {
        const clientWrapper = await getClient(false);
        if (clientWrapper.error) {
            return clientWrapper;
        }

        const client = clientWrapper.client;
        return client;
    });

    inject('invoke', async (action, body, displayNotificationOnError) => {
        const result = await invokeFunction(action, body, displayNotificationOnError);
        return result;
    });

    inject('decodeTransaction', async (transactionWrapper) => {
        const clientWrapper = await getClient(false);
        if (clientWrapper.error) {
            return clientWrapper;
        }

        const client = clientWrapper.client;

        console.log("me")
        console.log(transactionWrapper)

        const decodedTx = client.transaction.decode(transactionWrapper.result);
        const txJSON = client.transaction.toJSON(decodedTx);
        return client.transaction.fromJSON(txJSON);
    });




    inject('invokeWithRetry', async (action, body, displayNotificationOnError) => {
        const result = await retry(invokeFunctionWithNoTryCatch, action, body, displayNotificationOnError);
        return result;
    });

    const wait = interval => new Promise(resolve => setTimeout(resolve, interval));
    async function retry(fn, arg1, arg2, arg3, retriesLeft = 10, interval = 3000) {
        try {
            return await fn(arg1, arg2, arg3);
        } catch (error) {
            console.log(error)
            await wait(interval);
            if (retriesLeft === 0) {
                throw new Error(error);
            }
            return await retry(fn, arg1, arg2, arg3, --retriesLeft, interval);
        }
    }

    // const retry = (fn, arg1, arg2, arg3, retries = 0, ms = 3000, maxRetries = 10) => new Promise((resolve, reject) => {
    //     console.log("function:")
    //     console.log(fn)
    //     fn(arg1, arg2, arg3)
    //         .then(resolve)
    //         .catch((error) => {
    //             setTimeout(() => {
    //                 console.log('retrying failed promise... ' + retries);
    //                 console.log(error)
    //                 ++retries;
    //                 if (retries == maxRetries) {
    //                     return reject(error);
    //                 }
    //                 retry(fn, arg1, arg2, arg3, retries).then(resolve);
    //             }, ms);
    //         })
    // });

    inject('createTransaction', async (moduleId, assetId, assets, pin, displayNotificationOnError) => {
        console.log("createTransaction - LiskClient")
        const account = {
            publicKey: null,
            passphrase: null
        }
        try {
            console.log(authAccount)

            const decrypted = cryptography.decryptPassphraseWithPassword(
                JSON.parse(authAccount.crypt),
                "" + pin
            );


            account.passphrase = decrypted
            account.publicKey = authAccount.publicKey

        } catch (error) {
            return { error: true, stack: error }
        }

        const result = await transactionFunction(moduleId, assetId, assets, account, displayNotificationOnError);
        if (result.error) {
            for (let index = 0; index < 3; index++) {
                const retry = await transactionFunction(moduleId, assetId, assets, account, displayNotificationOnError);
                if (!retry.error) {
                    return retry;
                }
            }
        }
        return result;
    })

    inject('setAuthAccount', async (authAccountObj) => {
        authAccount = authAccountObj;
    })

    async function invokeFunction(action, body, displayNotificationOnError) {
        try {
            const clientWrapper = await getClient(false);
            if (clientWrapper.error) {
                return clientWrapper;
            }

            return { error: false, result: await clientWrapper.client.invoke(action, body) };

        } catch (error) {
            if (error.message == "Websocket client is not connected.") {
                const clientWrapper = await getClient(true);
                if (clientWrapper.error) {
                    return { error: true, stack: clientWrapper.error };
                }
                else {
                    try {
                        return { error: false, result: await clientWrapper.client.invoke(action, body) };
                    } catch (error) {
                        return { error: true, stack: error };
                    }
                }
            }
            if (displayNotificationOnError) {
            }
            return { error: true, stack: error };
        }
    }

    async function invokeFunctionWithNoTryCatch(action, body, displayNotificationOnError) {
        const clientWrapper = await getClient(false);
        if (clientWrapper.error) {
            return clientWrapper;
        }

        return { error: false, result: await clientWrapper.client.invoke(action, body) };
    }


    async function transactionFunction(moduleId, assetId, assets, account, displayNotificationOnError) {
        try {
            const clientWrapper = await getClient(false);
            if (clientWrapper.error) {
                return clientWrapper;
            }

            return { error: false, result: await createTransaction(moduleId, assetId, assets, account, clientWrapper.client) };

        } catch (error) {
            if (error.message == "Websocket client is not connected.") {
                const clientWrapper = await getClient(true);
                if (clientWrapper.error) {
                    return { error: true, stack: clientWrapper.error };
                }
                else {
                    try {
                        return { error: false, result: await createTransaction(moduleId, assetId, assets, account, clientWrapper.client) };
                    } catch (error) {
                        return { error: true, stack: error };
                    }
                }
            }
            if (displayNotificationOnError) {
            }
            return { error: true, stack: error };
        }
    }

    inject('api', async (reconnect) => {
        const clientWrapper = await getClient(reconnect);
        const kalipo = {
            server: server,
            client: clientWrapper.client,
            success: clientWrapper.success,
            message: clientWrapper.message,
            blockTime: 10,
        }
        return kalipo;
    })
}
