<!-- Kalipo B.V. - the DAO platform for business & societal impact 
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
-->

<template>
    <div>
        <div 
            v-for="(value, key) in this.signData"
            style="width: 100%;"
            cols="12"
        >
            <v-row v-if="(user == key)" style="width: 100%;">
                <v-col cols="8" md="8">  
                    <v-chip style="width: 100%; text-align: center; background-color: lightblue;">You</v-chip>
                </v-col>
                <v-col v-if="(value.signed)" cols="4" md="2">  
                    <v-chip outlined style="width: 100%; text-align: center;">{{ isSigned(value.signed) }}</v-chip>
                </v-col>
                <v-col v-else cols="4" md="2">  
                    <v-btn @click="SignAgreementVersion">clickme</v-btn>
                </v-col>
            </v-row>
        </div>
    
        <div
            v-for="(value) in this.signData2"
            cols="12" 
            style="width: 100%;"
        >
            <v-row style="width: 100%;">
                <v-col cols="8" md="8">  
                    <v-chip style="width: 100%; text-align: center;">{{ value.name }}</v-chip>
                </v-col>
                <v-col cols="4" md="2">  
                    <v-chip outlined style="width: 100%; text-align: center;">{{ isSigned(value.signed) }}</v-chip>
                </v-col>
            </v-row>
        </div>
        <v-dialog
            max-width="500px"
            v-model="dialog"
            activator="parent"
            >
            <AccountSign
                :transaction="transaction"
                :uri="uri"
                callback="AutonCreate-PrevStep"
                title="Sign the agreement"
            ></AccountSign>
        </v-dialog>
    </div>  
</template>
<script>
    export default {
        props: {
            tid: {type: String },
            version: {type: Number, default: 0}
        },
        data: () => ({
            signData: null,
            signData2: null,
            user: null,
            dialog: false,
            transaction: {
                moduleId: 1011,
                assetId: 2,
                assets: null,
            },
            uri: "",
        }),
        mounted: function() {
            this.getSignInfo();
        },
        methods: {
            async getSignInfo() {     
                const existingAccoundIdWrapper = await this.$invoke("agreement:getSignInfo", {id: this.tid, version: this.version});
                this.signData = existingAccoundIdWrapper.result;
                this.signData2 = JSON.parse(JSON.stringify(existingAccoundIdWrapper.result));
                this.user = this.$store.state.wallet.account.accountId;

                const accountId = this.user;
                if(this.signData2[accountId] != undefined) {
                    delete this.signData2[accountId];
                }
            },
            isSigned(info) {
                if (info) {
                    return "Signed"
                } else {
                    return "Not signed"
                }
            },
            SignAgreementVersion() {
                this.uri = "";
                this.transaction.assets = {tid: this.tid, version: this.version};
                this.dialog = true;
            },
        },
    };
</script>