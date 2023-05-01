<template></template>
<script>
export default {
    layout: "dao",
    data: () => ({
        dao: null,
    }),
    async beforeCreate() {
        this.$nuxt.$emit("Auton-setPage", "autons");

        const daoIdParam = this.$route.params.daoId.replaceAll("_", " ");

        const daoIdWrapper = await this.$invoke("dao:getDaoIdByName", {
            name: daoIdParam,
        });

        const daoWrapper = await this.$invoke("dao:getByID", {
            id: daoIdWrapper.result.id,
        });

        this.dao = daoWrapper.result;
        console.log(this.dao)
    }
}
</script>