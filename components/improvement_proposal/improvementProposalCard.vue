<template>
<!--  <v-hover id="hover">-->
  <div>

    <!--  min-width: 30%; min-height: 20vh; border-radius: 7px; padding: 10px 3% 10px 20px;-->

    <div :style="{display: 'flex', margin: '0 10px 0 10px', minWidth: '30%', maxWidth: '30%', borderRadius: '7px', minHeight: '140px', backgroundColor: 'white'}" >
      <div tabindex="0" class="v-card v-card--flat v-card--link v-sheet theme--light white pl-3"
           :style="{ minWidth: '300px', paddingRight: '15px',paddingLeft: '15px', paddingTop: '4px', display: 'flex' }">
        <div :style="{width: '100%'}">
          <div :style="{display: 'flex'}">
            <div :style="{width: '10%', marginRight: '5px'}">
              <v-avatar
                size="20"
                >
                <v-icon style="color: #212a42; font-size: 20px;" dark x-small> {{getStateIcon(this.proposal.result)}}</v-icon>
              </v-avatar>
            </div>
          <div class="mb-1" :style="{width: '88%'}">
            <p class="text-h3 mb-0" :style="{width: 'auto'}">{{ proposal.title }}</p>
            <p class="mb-0 text-h6 accent--text">
              {{ proposal.type }}
            </p>
          </div>
        </div>
        <div>
          <div>
            <p class="mb-0">{{
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
            <div outlined small :style="{width: '113%'}" @click="$router.push('/account/' + proposal.author)"
            >@{{ proposal.author }}
            </div>
          </div>
            <div :style="{display: 'flex', justifyContent: 'end', marginTop: '-20px'}">
              <v-btn @click="toProposal(proposal.link)" class="mr-1 mb-2 v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default accent">open</v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
<!--  </v-hover>-->
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
        return "#4797f6";
      }
      if (result === "ACCEPTED") {
        console.log("accepted")
        return "#4b957e";
      }
      if (result === "REJECTED") {
        return "#fa8085";
      }
      return "accent";
    },
    toProposal(uri) {
      console.log(uri);
      this.$router.push(uri);
    },
    getStateIcon(state){
      switch (state){
        case "UNDECIDED":
          return 'mdi-clock-time-two-outline';
        case 'ACCEPTED':
          return 'mdi-check-bold';
        default:
          return 'mdi-sword-cross';
      }
    }
  },
}
</script>
