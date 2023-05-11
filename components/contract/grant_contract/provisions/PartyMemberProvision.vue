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
    <v-container>
        <!-- <div class="text--primary pl-2"> {{ title }}</div> -->
        <v-autocomplete
            chips
            clearable
            deletable-chips
            multiple
            outlined
            v-model="selected"
            :disabled="isUpdating"
            :items="users"
            :rules="[this.selected?.length > 0 || 'There must be at least one party member!']"
            color="blue-grey lighten-2"
            label="Add (additional) party members"
            item-text="name"
            item-value="id"
            style="padding: 1px; margin: 5px;"
            hide-details="auto"
        >
        <template v-slot:selection="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            close
            @click="data.select"
            @click:close="remove(data.item)"
          >
            <v-avatar
              color="accent"
              class="white--text text-caption"
              v-if="data.item.name"
              left
              >{{ getInitials(data.item.name, 2) }}</v-avatar
            >
            {{ data.item.name }}
          </v-chip>
        </template>
        <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
                <v-list-item-avatar class="d-flex align-center justify-center">
                    <v-avatar
                        color="accent"
                        class="white--text text-caption"
                        v-if="data.item.name"
                    >
                        {{ getInitials(data.item.name, 3) }}
                    </v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                <v-list-item-title>{{data.item.name}}</v-list-item-title>
                <v-list-item-subtitle>{{data.item.username}}</v-list-item-subtitle>
                </v-list-item-content>
            </template>
        </template>
    </v-autocomplete>
</v-container>

</template>
<script>
    export default {
        props: {
            partyName: {type: String, default: "" },
            isContractor: {type: Boolean, default: false}
        },

        computed: {
            selected: {
                get: function () {
                    if (this.$props.isContractor) {
                        console.log(this.$store.state.contract.body);
                        return this.$store.state.contract.body.formData.parties.contractor;
                    } else {
                        return this.$store.state.contract.body.formData.parties.client;
                    }
                },
                set: function (partyArray) {
                    this.$store.commit("contract/changeParties", this.makePayload(partyArray));
                },
            },
            account() {
                return this.$store.state.wallet.account;
            },
        },

        mounted: async function () {
            this.isUpdating = true;
            const accountIdsWrapper = await this.$invoke("kalipoAccount:getAll");
            if (!accountIdsWrapper.error) {
                const ids = accountIdsWrapper.result.ids.reverse();
                for (let index = 0; index < ids.length; index++) {
                    const id = ids[index];
                    const accountWrapper = await this.$invoke("kalipoAccount:getByID", {
                        id: id,
                    });
                    if (!accountWrapper.error) {
                        accountWrapper.result.id = id;
                        this.users.push(accountWrapper.result);
                    }
                }
            }
            this.isUpdating = false;
        },

        data: () => ({
            isUpdating: true,
            users: [{ header: "Most recent users" }],
        }),

        methods: {
            remove(item) {
                this.$store.commit("contract/removeFromParties", this.makePayload(item));
            },

            makePayload(payloadData) {
                const payload = { target: "", data: payloadData }
                if (this.$props.isContractor) {
                    payload.target = "contractor"
                } else {
                    payload.target = "client"
                }
                return payload
            },

            getInitials(parseStr, max) {
                if (parseStr != undefined) {
                    const nameList = parseStr.split(" ");
                    let result = "";
                    for (let index = 0; index < nameList.length; index++) {
                        if (index < max) {
                            const element = nameList[index];
                            if (element.length > 0) {
                                result += element[0].toUpperCase();
                            }
                        } else {
                            break;
                        }
                    }
                    return result;
                } else {
                    return "";
                }
            },
        },
    }
</script>