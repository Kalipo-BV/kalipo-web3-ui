<template>
    <div>
      <v-form v-model="valid">
        <v-textarea
          filled
          auto-grow
          label="Title"
          rows="2"
          row-height="20"
          maxlength="50"
          counter
          v-model="statementValue"
        ></v-textarea>

        <v-textarea
          filled
          auto-grow
          label="Added value"
          rows="2"
          row-height="20"
          maxlength="100"
          counter
          v-model="addedValue"
        ></v-textarea>

        <v-textarea
          filled
          auto-grow
          label="Description"
          rows="2"
          row-height="20"
          maxlength="300"
          counter
          v-model="descriptionValue"
        ></v-textarea>
      </v-form>
    </div>
  </template>

<script>
export default {
  props: ["descriptionMessage", "statementMessage", "addedValueMessage", "disabledNext", "autonId"],
  computed: {
    statementValue: {
        get: function () {
        return this.statementMessage;
      },
      set: function (newValue) {
        this.$emit("update:statementMessage", newValue);
      },
    },
    addedValue: {
        get: function () {
        return this.addedValueMessage;
      },
      set: function (newValue) {
        this.$emit("update:addedValueMessage", newValue);
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