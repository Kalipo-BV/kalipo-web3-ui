<template>
  <div>
    <v-form v-model="valid" @submit.prevent>
      <v-autocomplete
        v-model="selectedValue"
        :disabled="isUpdating"
        :items="users"
        chips
        color="blue-grey lighten-2"
        label="Proposer"
        item-text="name"
        item-value="id"
        :rules="[rules.required]"
      >
        <template v-slot:selection="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selectedValue"
            close
            @click="data.select"
            @click:close="remove(data.username)"
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
  </div>
</template>

<script>
export default {
  props: ["selectedAccountId", "invitationMessage", "disabledNext", "autonId"],
  computed: {
    selectedValue: {
      get: function () {
        return this.selectedAccountId;
      },
      set: function (newValue) {
        this.$emit("update:selectedAccountId", newValue);
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
      if (parseStr !== undefined) {
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
      if (BigInt(membershipWrapper.result.started) !== BigInt(0)) {
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
        if (!accountWrapper.error && alreadyMemberAccounts.indexOf(id) === -1) {
          accountWrapper.result.id = id;
          this.users.push(accountWrapper.result);
        }
      }
    }
    this.isUpdating = false;
  },
};
</script>

<style scoped>

</style>
