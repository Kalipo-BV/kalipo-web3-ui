<template>
  <div>
    <v-autocomplete
      v-model="selectedValue"
      :disabled="isUpdating"
      :items="users"
      chips
      color="blue-grey lighten-2"
      label="Add additional members"
      item-text="name"
      item-value="id"
      multiple
    >
      <template v-slot:selection="data">
        <v-chip
          v-bind="data.attrs"
          :input-value="data.selectedValue"
          close
          @click="data.select"
          @click:close="remove(data.item.id)"
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
  </div>
</template>

<script>
export default {
  props: ["proposers"],
  computed: {
    selectedValue: {
      get: function () {
        console.log(this.proposers)
        return this.proposers;
      },
      set: function (newValue) {
        console.log(newValue)
        this.$emit("update:proposers", newValue);
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
  methods: {
    remove(item) {
      console.log(item)
      const index = this.selectedValue.indexOf(item);
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

  data: () => ({
    isUpdating: true,
    users: [{ header: "Most recent users" }],
  }),
};
</script>
<style scoped>

</style>
