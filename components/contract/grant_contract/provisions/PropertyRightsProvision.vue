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
        v-model="propertyRights"
        rows="2"
        style="background-color: white;"
        label="Property rights"
        outlined
        hide-details="auto"
        clearable
        auto-grow
        model-value="fill me in"
        :rules="[v => !!v || 'This field can\'t be left open!']"
    />
</template>
<script>
    export default {
        computed: {
            propertyRights: {
                get: function () {
                    return this.$store.state.contract.contract.formData.propertyRights;
                },
                set: function (payload) {
                    this.$store.commit("contract/changePropertyRights", payload);
                },
            },
        },
    }
</script>