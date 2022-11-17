<template>
    <div>
        <v-form v-model="valid">
            <v-card-text>
                <v-row justify="center">
                    <v-col cols="2" class="red">
                        <v-label>{{ textFieldsAmount }}/4</v-label>
                    </v-col>
                </v-row>
                <v-container id="scroll-target" style="max-height: 280px" class="overflow-y-auto">
                    <v-row v-scroll:#scroll-target="onScroll">
                        <v-col cols="12" v-for="(textField, i) in textFields" :key="i" class="text-fields-row">
                            <v-row>
                                <v-col cols="11" class="py-0">
                                    <v-text-field v-model="textField.value" :label="i + 1 + ') Option *'" required
                                        counter maxlength="100"></v-text-field>
                                </v-col>
                                <v-col cols="1" class="px-1">
                                    <v-btn outlined color="error" :disabled="textFieldsAmount == 2" @click="remove(i)"
                                        elevation="1" icon small>
                                        <v-icon color="error">{{ "mdi-trash-can-outline" }}</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-container>
                <v-row justify="center">
                    <v-col cols="1" class="pl-1">
                        <v-btn class="secondary" color="white" :disabled="textFieldsAmount > 3" @click="add" icon large>
                            <v-icon>{{ "mdi-plus" }}</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <small>*required field</small>
            </v-card-text>
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
        remove(index) {
            this.textFields.splice(index, 1)
            this.textFieldsAmount--
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