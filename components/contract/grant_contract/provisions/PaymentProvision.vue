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
        <v-row>
            <v-col cols=6>
                <v-card>
                    <v-text-field
                        v-model="amount"
                        style="background-color: white; margin-bottom: 15px;"
                        type="number"
                        clearable
                        auto-grow
                        required
                        outlined
                        hide-details="auto"
                        label="Payment Amount"
                        :rules="[v => v > 0 || 'This field can\'t be left open (>0)!']"
                    />
                </v-card>
            </v-col>
            
            <v-col cols="6">
                <v-card>
                    <v-text-field
                        v-model="note"
                        rows="1"
                        clearable
                        auto-grow
                        outlined
                        hide-details="auto"
                        label="Payment Note"
                        style="background-color: white;"
                    />
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
    export default {
        computed: {
            
            note: {
                get: function () {
                    return this.$store.state.contract.formData.payment.amount;
                },
                set: function (payload) {
                    this.$store.commit("contract/changePaymentAmount", payload);
                },
            },
            amount: {
                get: function () {
                    return this.$store.state.contract.formData.payment.note;
                },
                set: function (payload) {
                    this.$store.commit("contract/changePaymentNote", payload);
                },
            }
            
        },
    }
</script>