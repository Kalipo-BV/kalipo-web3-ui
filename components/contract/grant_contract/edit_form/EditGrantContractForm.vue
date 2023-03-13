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
  <v-sheet width="90%" class="mx-auto pa-10" style="margin-top: 10vh; margin-bottom: 12vh;">
    <h1 style="margin-bottom: 10px;">Edit Template (Grant Contract)</h1>
    <v-form ref="form">
      <v-autocomplete
        prepend-icon="mdi-account-multiple-plus"
        chips
        clearable
        deletable-chips
        multiple
        v-model="selectedValue"
        :disabled="isUpdating"
        :items="users"
        :rules="[this.selectedValue?.length > 0 || 'You must agree to continue!']"
        color="blue-grey lighten-2"
        label="Add (additional) party members"
        item-text="name"
        item-value="id"
        style="padding: 1px; margin: 5px;"
      >
        <template v-slot:selection="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selectedValue"
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
        
      <!-- v-model="preample" -->
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
        />

      <!-- v-model="purposeOfTheGrant" -->
      <v-container fluid style="padding: 1px; margin: 5px;">
        <v-textarea
          rows="2"
          solo
          clearable
          label="Purpose of the grand"
          auto-grow
          model-value="fill me in"
          :rules="[v => !!v || 'The purpose of the grand can\'t be left open!']"
          prepend-icon="mdi-card-text-outline" 
        />
      </v-container>

      <v-container
        style="padding: 10px; margin: 5px; margin-bottom: 30px; outline: auto; outline-color: lightgray;"
        label="Payment of the grant"
      >
        <!-- v-model="paymentOfTheGrant" -->
        <v-text-field
          style="padding: 1px"
          label="Payment amount"
          prepend-icon="mdi-cash-multiple" 
          type="number"
          clearable
          required
          :rules="[v > 0 || 'This field can\'t be left open (>0)!']"
        />

        <v-textarea
          rows="1"
          solo
          clearable
          label="Payment note"
          auto-grow
          hide-details="auto"
          prepend-icon="mdi-receipt-text-plus-outline" 
          style="padding-bottom: 5px;"
        />
      </v-container>
      
      <v-container
        style="padding: 10px; margin: 5px; margin-bottom: 30px; outline: auto; outline-color: lightgray;"
        label="Date (begin- & end date)"
      >
        <DateTimeProvision/>
      </v-container>  
      
      <v-container fluid style="padding: 1px; margin: 5px;">
        <v-textarea
          rows="2"
          solo
          clearable
          label="Intelectual property rights"
          auto-grow
          model-value="fill me in"
          :rules="[v => !!v || 'This field can\'t be left open!']"
          prepend-icon="mdi-file-certificate-outline" 
        />
      </v-container>
      
      <v-container fluid style="padding: 1px; margin: 5px;">
        <v-textarea
          rows="2"
          solo
          clearable
          label="Termination of the agreement"
          auto-grow
          model-value="fill me in"
          :rules="[v => !!v || 'This field can\'t be left open!']"
          prepend-icon="mdi-calendar-remove-outline" 
        />
      </v-container>

      <v-container fluid style="padding: 1px; margin: 5px;">
        <v-textarea
          rows="2"
          solo
          clearable
          label="Governing law and jurisdiction"
          auto-grow
          model-value="fill me in"
          :rules="[v => !!v || 'This field can\'t be left open!']"
          prepend-icon="mdi-gavel" 
        />
      </v-container>

      <v-container fluid style="padding: 1px; margin: 5px;">
        <v-textarea
          rows="2"
          solo
          clearable
          label="Final provisions"
          auto-grow
          model-value="fill me in"
          :rules="[v => !!v || 'This field can\'t be left open!']"
          prepend-icon="mdi-format-list-bulleted" 
        />
      </v-container>

      <!-- //do some shit -->

      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must sign the contract to continue!']"
        label="I hereby agree to the aforementioned contract?"
        required
      ></v-checkbox>
      <!-- prepend-icon="mdi-signature"  -->

      <div class="d-flex flex-column">
        <v-btn
          color="success"
          class="mt-4"
          block
          @click="validate"
        >
          Sign
        </v-btn>

        <v-btn
          color="error"
          class="mt-4"
          block
          @click="reset"
        >
          Reset Form
        </v-btn>

        <v-btn
          color="warning"
          class="mt-4"
          block
          @click="resetValidation"
        >
          Reset Validation
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>
<script>
import DateTimeProvision from "~/components/contract/grant_contract/provisions/DateTimeProvision.vue";

export default {
  components: {DateTimeProvision},
  computed: {
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
    // filter so you cant add yourself
    this.users = this.users.filter(
      (item) => item.id !== this.account.accountId
    );
    this.isUpdating = false;
  },
  data: () => ({
    isUpdating: true,
    users: [{ header: "Most recent users" }],
    valid: true,
    name: "",
    select: null,
    checkbox: false,
    selectedValue: [],
  }),
  methods: {
    async validate() {
      // console.log(this.selectedValue);
      const { valid } = await this.$refs.form.validate();
      if (valid)
        alert("Form is valid");
    },
    remove (item) {
      const index = this.selectedValue.indexOf(item.name)
      if (index >= 0) this.selectedValue.splice(index, 1)
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    remove(item) {
      const index = this.selectedValue.indexOf(item.id);
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
}
</script>