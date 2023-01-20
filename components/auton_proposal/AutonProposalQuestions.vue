<template>
    <div>
        <v-form v-model="valid">
            <v-card-text>
                <v-row class="justify-center" dense>
                  <v-label>{{ textFieldsAmount }}/50</v-label>
                </v-row>
                <v-container id="scroll-target" style="max-height: 280px" class="overflow-y-auto">
                    <v-row v-scroll:#scroll-target="onScroll">
                        <v-col cols="12" v-for="(textField, i) in textFields" :key="i" class="text-fields-row">
                            <v-row>
                                  <v-col cols="12" class="py-0">
                                    <v-text-field v-on:input="getChoicesMessage" v-model="textField.value" required counter maxlength="100">
                                      <v-icon slot="prepend-inner" v-text="'mdi-numeric-' + (i + 1)"></v-icon>
                                      <v-icon slot="append" color="error" :disabled="textFieldsAmount == 2" @click="removed(i)">{{ "mdi-trash-can-outline" }}</v-icon>
                                    </v-text-field>
                                  </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-container>
                <v-row justify="center">
                    <v-col cols="1" class="pl-1">
                        <v-btn class="secondary" color="white" :disabled="textFieldsAmount > 49" @click="add" icon small>
                            <v-icon>{{ "mdi-plus" }}</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <small>*required field</small>
            </v-card-text>
        </v-form>
      <v-divider></v-divider>
    </div>
</template>

<script>
export default {
    props: ["disabledNext", "autonId"],
    computed: {
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
        dialog: false,
        offsetTop: 0,
        textFields: [{ label: "Option", value: "" }, { label: "Option", value: "" }],
        textFieldsAmount: 2,
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

      getChoicesMessage() {
        const choices = this.textFields.map(function (choices) {
          return choices.value;
        });
        this.$emit('data:choices', choices)
      },
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
        onScroll(e) {
            this.offsetTop = e.target.scrollTop
        },
        add() {
            this.textFields.push({ label: "Option", value: "" })
            this.textFieldsAmount++
        },
        removed(index) {
            this.textFields.splice(index, 1)
            this.textFieldsAmount--
            this.getChoicesMessage();
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

<style>
.red .label{
    font-size: 10px;
}
</style>
