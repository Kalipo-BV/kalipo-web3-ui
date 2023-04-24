<template>
<!--  <v-hover id="hover">-->
  <div @click="toProposal(proposal.link)">

    <!--  min-width: 30%; min-height: 20vh; border-radius: 7px; padding: 10px 3% 10px 20px;-->

    <div :style="{display: 'flex', margin: '0 10px 0 10px', minWidth: '30%', borderRadius: '7px', minHeight: '160px', backgroundColor: 'white'}" >
      <div tabindex="0" class="v-card v-card--flat v-card--link v-sheet theme--light white pl-3"
           :style="{ minWidth: '300px', padding: '15px', paddingTop: '0px', display: 'flex' }">
        <div style="width: 90%!important;">
          <p style="font-size: 22px!important;" class="text-h1 mb-1 accent--text">{{ proposal.title }}</p>

          <div>

            <p class="mb-0">
              {{ proposal.type }}
            </p>
<!--            Haal dit er uit als peter t oké vindt-->


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
            <v-chip dark outlined small :style="{marginBottom: '10px'}"  :color=getResultColor(proposal.result)>
            {{ proposal.result }}
          </v-chip>
<!--            <p>TEST</p>-->
            <v-btn outlined small :style="{width: '113%'}" @click="$router.push('/account/' + proposal.author)"
            >@{{ proposal.author }}
            </v-btn>
          </div>
        </div>
        <div class="d-flex align-center" :style="{width: '10%', marginLeft: '2%'}">
          <p class="font-weight-regular" :style="{color: '#0F6AF1', marginBottom:'0px', fontSize: '45px'}">
            >
          </p>
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
    }
  },
}
</script>
