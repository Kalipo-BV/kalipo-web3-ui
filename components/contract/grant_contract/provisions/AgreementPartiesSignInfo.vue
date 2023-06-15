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
    
</template>
<script>
    export default {
        props: {
            tid: {type: String },
            version: {type: Number, default: 0}
        },

        // mounted: async function () {
        //     this.getSignInfo();
        // },

        methods: {
            async getSignInfo() {       
                const existingAccoundIdWrapper = await this.$invoke("agreement:getSignInfo", {id: this.tid, version: this.version});
                console.log(existingAccoundIdWrapper);
            },
        },
    };
</script>