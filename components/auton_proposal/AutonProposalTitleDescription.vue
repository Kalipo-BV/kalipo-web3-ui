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
      <v-form v-model="valid">
        <v-textarea
          filled
          auto-grow
          label="Title"
          rows="2"
          row-height="20"
          maxlength="100"
          counter
          v-model="titleValue"
        ></v-textarea>

        <v-textarea
          filled
          auto-grow
          label="Description"
          rows="2"
          row-height="40"
          maxlength="300"
          counter
          v-model="descriptionValue"
        ></v-textarea>
      </v-form>
    </div>
  </template>

<script>
export default {
  props: ["descriptionMessage", "titleMessage", "disabledNext", "autonId"],
  computed: {
    titleValue: {
        get: function () {
        return this.titleMessage;
      },
      set: function (newValue) {
        this.$emit("update:titleMessage", newValue);
      },
    },
    descriptionValue: {
      get: function () {
        return this.descriptionMessage;
      },
      set: function (newValue) {
        this.$emit("update:descriptionMessage", newValue);
      },
    },
  },
  watch: {
    valid: {
      handler: function (newValid) {
        this.$emit("update:disabledNext", !newValid);
      },
      deep: true,
    },
  },
  data: () => ({
    valid: false,
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
    remove(item) {
      const index = this.selectedValue.indexOf(item.name);
      if (index >= 0) this.selectedValue.splice(index, 1);
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

  mounted: async function () {
    this.isUpdating = true;
    const accountIdsWrapper = await this.$invoke("kalipoAccount:getAll");
    console.log(accountIdsWrapper);

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
