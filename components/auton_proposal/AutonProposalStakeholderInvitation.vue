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
    <v-form v-if="step == 'voeg-stakeholder-toe'" v-model="valid" @submit.prevent>
      <v-autocomplete
        v-model="selectedValue"
        :disabled="isUpdating"
        :items="users"
        chips
        color="blue-grey lighten-2"
        label="add Stakeholder"
        item-text="name"
        item-value="id"
        :rules="[rules.required]"
      >
        <template v-slot:selection="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selectedValue"
            close
            @click=" cycleStep(data)"
            @click:close="remove()"
          >
            <v-avatar
              color="accent"
              class="white--text text-caption"
              v-if="data.item.name"              
              left
              >{{ getInitials(data.item.name, 2) }}</v-avatar
            >
            {{ data.item.name}}
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
                >{{ getInitials(data.item.name, 3) }}</v-avatar
              >
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ data.item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{
                data.item.username
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>
    </v-form>

    <v-container style="height: 100%" v-if="step == 'info-stakeholder'">
      <p>naam: {{ selectedValue.name }} <br> username: {{ selectedValue.username }}</p>
      <v-btn @click="cycleStep" class="button">Change Stakeholder</v-btn>
  </v-container>
    
  </div>
</template>

<script>
export default {
  props: ["selectedAccountId", "disabledNext", "autonId"],
  computed: {
    selectedValue: {
      get: function () {
        return this.selectedAccountId;
      },
      set: function (newValue) {
        this.selectedAccountId = newValue;
//        this.$emit("update:selectedAccountId", newValue);
      },
    },
  },
  watch: {
    valid: {
      handler: function (newValid) {
        // this.iconValue = this.generatedIcons[newIndex];
        this.$emit("update:disabledNext", !newValid);
      },
      deep: true,
    },
  },
  data: () => ({
    valid: false,
    step: "voeg-stakeholder-toe",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v?.length >= 2 || "Min 2 characters",
      max: (v) => v?.length <= 16 || "Max 16 characters",
    },
    isUpdating: true,
    users: [{ header: "Most recent users" }],
  }),
  mounted() {
    this.$emit("update:disabledNext", true);
  },
  destroyed() {
    this.$emit("update:disabledNext", false);
  },
  methods: {
    cycleStep(data) {
      
            if (this.step == "voeg-stakeholder-toe") {
                this.selectedValue = data.item
                this.step = "info-stakeholder";
            }
            else if (this.step == "info-stakeholder") {
                this.step = "voeg-stakeholder-toe";
            }
          },
    remove() {
      this.selectedValue = "";
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
        return "geen initals?";
      }
    },
  },

  mounted: async function () {
    this.isUpdating = true;
    const accountIdsWrapper = await this.$invoke("kalipoAccount:getAll");

    const autonWrapper = await this.$invoke("auton:getByID", {
      id: this.autonId,
    });

    const alreadyMemberAccounts = [];
    for (
      let index = 0;
      index < autonWrapper.result.memberships.length;
      index++
    ) {
      const membershipId = autonWrapper.result.memberships[index];

      const membershipWrapper = await this.$invoke("membership:getByID", {
        id: membershipId,
      });
      if (BigInt(membershipWrapper.result.started) != BigInt(0)) {
        alreadyMemberAccounts.push(membershipWrapper.result.accountId);
      }
    }

    if (!accountIdsWrapper.error) {
      const ids = accountIdsWrapper.result.ids.reverse();
      // waarom worden de id's gereversed? ff weghalen en kijken hoe de members worden weergeven
      for (let index = 0; index < ids.length; index++) {
        const id = ids[index];
        const accountWrapper = await this.$invoke("kalipoAccount:getByID", {
          id: id,
        });
        if (!accountWrapper.error && alreadyMemberAccounts.indexOf(id) == -1) {
          accountWrapper.result.id = id;
          this.users.push(accountWrapper.result);
        }
      }
    }
    this.isUpdating = false;
  },
};
</script>

<style></style>
