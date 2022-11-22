<template lang="">
  <div>
    <v-form>
      <v-select
        v-model="selectedValue"
        :items="availablePoasNames"
        label="Select a poa"
        multiple
        chips
        hint="Multiple is possible"
        persistent-hint
        item-text="name"
        return-object
      ></v-select>
    </v-form>
  </div>
</template>
<script>
export default {
  props: ["member", "poas", "selected"],
  data() {
    return {
      availablePoas: [],
      availablePoasNames: [],
    };
  },
  mounted() {
    this.filterPoas();
  },
  computed: {
    selectedValue: {
      get: function () {
        return this.selected;
      },
      set: function (newValue) {
        this.$emit("update:selected", newValue);
      },
    },
  },
  methods: {
    async filterPoas() {
      // check all poas from member
      const poasMember = [];

      for (let i = 0; i < this.member.account.issuedPoas.length; i++) {
        const poaIssueWrapper = await this.$invoke("poaIssue:getByID", {
          id: this.member.account.issuedPoas[i],
        });
        poasMember.push(poaIssueWrapper.result.poaId);
      }

      this.availablePoas = this.poas.filter(function (el) {
        return !poasMember.includes(el);
      });

      // poa names
      for (let i = 0; i < this.availablePoas.length; i++) {
        const poaWrapper = await this.$invoke("poa:getByID", {
          id: this.availablePoas[i],
        });
        this.availablePoasNames.push({
          name: poaWrapper.result.name,
          id: this.availablePoas[i],
        });
      }
    },
  },
};
</script>
