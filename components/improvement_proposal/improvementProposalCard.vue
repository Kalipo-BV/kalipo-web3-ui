<template>
  <div id="test" @click="toProposal(proposal.link)">

<!--  min-width: 30%; min-height: 20vh; border-radius: 7px; padding: 10px 3% 10px 20px;-->
    <div class="white"
         :style="{display: 'flex', margin: '0 10px 0 10px'}">
      <div style="width: 100%; display: grid">
        <div tabindex="0" class="v-card v-card--flat v-card--link v-sheet theme--light white"
             :style="{ width: '300px', padding: '20px 30px 20px 30px', borderRadius: '7px', display: 'flex' }">
          <div :style="{width: '100%'}">
            <p style="color: #0F6AF1;" class="text-h1 mb-2">{{ proposal.title }}</p>

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
import {left} from "core-js/internals/array-reduce";

export default {
  props: {
    proposal: String,
  },

  data: () => ({}),
  methods: {
    left,
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
    toProposal(uri) {
      console.log(uri);
      this.$router.push(uri);
    }
  },
}
</script>
