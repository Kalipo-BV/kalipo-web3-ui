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
        rows="2"
        solo
        clearable
        auto-grow
        prepend-icon="mdi-file-document-edit-outline"
        style="padding: 1px; margin: 5px;"
        :rules="[v => !!v || 'This field can\'t be left open!']"
        label="Preample"
        required
        v-model="preampleValue"
        @change="change"
        :value="preample2"
    />
</template>
<script>
    export default {
        props: ["preample"],

        computed: {
            preampleValue: {
                get: function () {
                    return this.preample;
                },
                set: function (newValue) {
                    this.$emit("update:preample", newValue);
                },
            },

            preample2() {
                return this.$store.getters["contract/preample"];
            }
        }, 

        methods: {
            change(payload) {
                this.$store.commit("contract/changePreample", payload);
            }
            
        },
    }
</script>