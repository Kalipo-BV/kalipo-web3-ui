<template>
  <div>


    <div class="white"
         style="min-width: 30%; margin-right: 3%; margin-top: 20px; min-height: 20vh; padding-left: 20px; padding-top: 10px; border-radius: 7px; padding-bottom: 10px; display: flex;">
      <div style="width: 90%; display: grid;">
        <div tabindex="0" class="v-card v-card--flat v-card--link v-sheet theme--light white"
             :style="{ width: '300px', marginRight: '30px', paddingLeft: '20px', paddingTop: '10px', borderRadius: '7px', paddingBottom: '10px', display: 'flex' }"
             link @click="toProposal">
          <div :style="{width: '90%'}">
            <a :href=proposal.link style="color: #0F6AF1;" class="text-h1 mb-2">{{ proposal.title }}</a>

            <div>
              <p class="mb-0">
                Type: {{ proposal.type }}
              </p>
              <v-btn outlined small @click="$router.push('/account/' + proposal.author)"
              >@{{ proposal.author }}
              </v-btn>
              <v-chip :color="getResultColor(proposal.result)" dark outlined small>
                {{ proposal.result }}
              </v-chip>

              <p>{{
                new Date(parseInt(proposal.submission) * 1000).toLocaleDateString(
                  userLang,
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  }
                )
              }}</p>

            </div>
          </div>
          <div class="d-flex align-center" :style="{width: '10%'}">
            <p class="font-weight-regular" :style="{color: '#0F6AF1', marginBottom:'0px', fontsize: 'xx-large'}">
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    proposal: String,
  },

  data: () => ({}),
  methods: {
    getResultColor(result) {
      if (result === "UNDECIDED") {
        return "accent";
      }
      if (result === "ACCEPTED") {
        return "success";
      }
      if (result === "REJECTED") {
        return "error";
      }
      return "accent";
    },
    toProposal() {
      const uri = `/auton/${this.$route.params.autonId}/improvementproposal/detail`;
      console.log(uri);
      this.$router.push(uri);
    }
  },
}
</script>
