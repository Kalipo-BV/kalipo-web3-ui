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
  <div>
    <v-card flat link min-height="360px">
      <v-card-text @click="$router.push('/account/' + member.account.username)">
        <div class="d-flex justify-center">
          <v-avatar size="90" color="primary" class="white--text text-h2">{{
            getInitials(member.account.name)
          }}</v-avatar>
        </div>
        <div class="d-flex justify-center text-h4 text--primary mt-2">
          {{ member.account.name }}
        </div>

        <div class="d-flex justify-center text-caption text--primary mt-2">
          {{ role }}
        </div>
      </v-card-text>
      <v-divider v-if="member.started"></v-divider>

      <v-card-text v-if="member.started">
        <div
          class="d-flex justify-center text-caption text--primary"
          v-if="userLang"
        >
          Joined:
          {{
            new Date(parseInt(member.started) * 1000).toLocaleDateString(
              userLang,
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )
          }}
        </div>
      </v-card-text>

      <v-divider v-if="studentCard"></v-divider>

      <v-container v-if="studentCard" class="d-flex justify-center">
        <v-chip v-if="member.checkedIn && studentCard" class="ma-2" color="green" text-color="white">
          <v-icon left>mdi-account-check</v-icon>
          Checked in
        </v-chip>

        <v-chip v-if="!member.checkedIn && studentCard" class="ma-2" align="center" color="red" text-color="white">
          <v-icon left>mdi-account-remove</v-icon>
          Not checked in
        </v-chip>
      </v-container>

      <v-divider></v-divider>

      <v-card-text>
        <div class="d-flex justify-center">
          <div v-for="(social, z) in member.account.socials" :key="z">
            <v-btn color="accent" fab x-small class="mr-1"
              ><Icon
                :icon="getIcon(social.social)"
                width="18"
                height="18"
              ></Icon
            ></v-btn>
          </div>
          <div v-if="member.account.socials.length == 0" class="py-1">
            No socials found
          </div>
        </div>
        <div class="mt-2">
          <v-btn
            v-if="attendeeCard"
            :disabled="authorizedIssuePoa"
            @click="dialog = !dialog"
            :style="{ left: '50%', transform: 'translateX(-50%)' }"
            >Issue poa</v-btn
          >
        </div>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="500">
      <PoaIssueDialog
        :member="member"
        :autonId="member.autonId"
      ></PoaIssueDialog>
    </v-dialog>
  </div>
</template>
<script>
import { Icon } from "@iconify/vue2";

export default {
  props: ["member", "attendeeCard", "studentCard", "autonId"],
  components: {
    Icon,
  },
  computed: {
    account() {
      return this.$store.state.wallet.account;
    },
    unlocked() {
      return this.$store.state.wallet.unlocked;
    },
  },
  data: () => ({
    userLang: null,
    role: "",
    dialog: false,
    authorizedIssuePoa: true,
    auton: null,
  }),
  methods: {
    async authorized() {
      if (this.autonId != null) {
        if (this.unlocked) {
          const memberships = this.$store.state.wallet.account.memberships;
          memberships.forEach(async (element) => {
            const mship = await this.$invoke("membership:getByID", {
              id: element,
            });
            if (
              mship.result.autonId == this.autonId.id &&
              mship.result.role == "FULL_MEMBER"
            ) {
              this.authorizedIssuePoa = false;
            }
          });
        } else {
          return true;
        }
      }
    },
    getInitials(parseStr) {
      if (parseStr != undefined) {
        const nameList = parseStr.split(" ");
        let result = "";
        for (let index = 0; index < nameList.length; index++) {
          if (index < 3) {
            const element = nameList[index];
            if (element[0] == undefined) {
              continue;
            }
            result += element[0].toUpperCase();
          } else {
            break;
          }
        }
        return result;
      }
    },
    getIcon(socialName) {
      socialName = socialName.toLowerCase();
      if (socialName == "twitter") {
        return "mdi:twitter";
      }
      if (socialName == "facebook") {
        return "mdi:facebook";
      }

      if (socialName == "linkedin") {
        return "mdi:linkedin";
      }

      if (socialName == "discord") {
        return "mdi:discord";
      }

      if (socialName == "youtube") {
        return "mdi:youtube";
      }

      if (socialName == "google") {
        return "mdi:google";
      }
    },
  },
  async mounted() {
    this.userLang = navigator.language || navigator.userLanguage;

    const autonWrapper = await this.$invoke("auton:getByID", {
        id: this.autonId,
    });

    this.auton = autonWrapper.result;

    if (this.member.role == "AFFILIATE_MEMBER") {
      this.role = "Affiliate member";
    }

    if (this.member.role == "FULL_MEMBER") {
      this.role = "Full member";
    }

    console.log(this.studentCard)
    console.log(this.attendeeCard)

    this.authorized();
  },
};
</script>

