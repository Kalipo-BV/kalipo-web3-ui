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
    <v-textarea
        v-model="purposeInput"
        rows="2"
        solo
        clearable
        label="Purpose of the grand"
        auto-grow
        model-value="fill me in"
        :rules="[v => !!v || 'The purpose of the grand can\'t be left open!']"
        prepend-icon="mdi-card-text-outline" 
        @change="change"
        :value="purpose"
    />
</template>
<script>
    export default {
        props: ["purpose"],

        computed: {
            purposeInput: {
                get: function () {
                    return this.purpose;
                },
                set: function (newValue) {
                    this.$emit("update:purpose", newValue);
                },
            },
            
            purpose() {
                return this.$store.getters["contract/purpose"];
            }
        },

        methods: {
            change(payload) {
                this.$store.commit("contract/changePurpose", payload);
            }
        },
    }    
</script>