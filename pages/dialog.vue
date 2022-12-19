<template>
  <check-in-dialog :auton="this.auton"></check-in-dialog>
</template>

<script>
import CheckInDialog from "~/components/lesson/CheckInDialog";
export default {
  name: "dialog",
  components: {CheckInDialog},
  data: () => ({
    auton: {
      autonProfile: {
        name: "AutonName",
      },
      lessonProfile: {
        lessonName: "Default lesson moment",
        subject: "pe3",
        description: "Default lesson moment description",
      },
    },
    methodes: {
      // TODO: get the real autonId with UUID shizzel
      findScannedAuton() {
        const UUID = this.$route.params.uuid;


        // this.auton = foundAuton;
      },
    },
  }),
}
</script>

<style scoped>

</style>
