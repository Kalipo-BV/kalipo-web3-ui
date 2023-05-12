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
    <v-toolbar class="mt-0 px-3" color="primary" dense>
      <!-- <div class="d-flex justify-start align-center">
        <v-avatar color="accent" size="30px"
          ><v-icon small dark>mdi-bank</v-icon></v-avatar
        >
        <div class="text-h4 primary--text ml-2">Constitution</div>
      </div> -->

      <v-tabs
        show-arrows
        v-model="selectedItem"
        color="white"
        class="ml-4"
        dark
      >
        <v-tab v-for="(item, idx) in tabItemsDefault" :key="idx">
          <v-icon small class="mr-2">{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-container>
      <div class="mt-n5">
        <div v-if="selectedItem === 0">
          <v-row>
            <v-col cols="12" md="4">
              <div class="mt-4">
                <div class="text-h3">Versions</div>
                <v-card class="mt-2">
                  <v-card-text class="black--text">
                    <v-row>
                      <v-col cols="12" md="6">
                        <div class="text-h6">
                          Version:
                          <span class="font-weight-regular">{{
                            termsAndConditionsVersionSelected
                          }}</span>
                        </div>
                        <div class="text-h6">
                          Effectuation date:
                          <span class="font-weight-regular">01-01-2023</span>
                        </div>
                      </v-col>
                      <v-col cols="12" md="6" class="d-flex justify-end">
                        <div>
                          <div class="text-h6">Decided by:</div>
                          <v-btn color="accent" small>Go to proposal</v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-text class="black--text">
                    <v-row dense>
                      <v-col cols="12" md="12">
                        <div class="text-h6">5 glossary changes</div>
                        <v-list>
                          <v-list-item two-line dense class="grey lighten-4">
                            <v-list-item-avatar size="20">
                              <v-icon class="grey" dark x-small>
                                mdi-pencil
                              </v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title class="text-caption"
                                >1.1. Ecosystem customer
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                <v-chip x-small class="mr-1"
                                  >Content changed</v-chip
                                >
                                <v-chip x-small class="mr-1"
                                  >Title changed</v-chip
                                >
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-col>
                      <v-col cols="12" md="12">
                        <div class="text-h6">3 preamble changes</div>
                        <v-list>
                          <v-list-item two-line dense class="grey lighten-4">
                            <v-list-item-avatar size="20">
                              <v-icon class="grey" dark x-small>
                                mdi-delete
                              </v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title class="text-caption"
                                >12. Strategic positioning
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                <v-chip x-small class="mr-1">Removed</v-chip>
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-col>
                      <v-col cols="12" md="12">
                        <div class="text-h6">3 article changes</div>
                        <v-list>
                          <v-list-item two-line dense class="grey lighten-4">
                            <v-list-item-avatar size="20">
                              <v-icon class="grey" dark x-small>
                                mdi-plus
                              </v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title class="text-caption"
                                >6. Online obligations
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                <v-chip x-small class="mr-1">Created</v-chip>
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-col>
                    </v-row>
                    <div class="d-flex justify-center mt-2">
                      <v-btn small
                        ><v-icon small class="mr-2">mdi-arrow-down</v-icon> Show
                        all 11 changes</v-btn
                      >
                    </div>
                  </v-card-text>
                </v-card>
                <v-pagination
                  class="mt-2"
                  v-model="termsAndConditionsVersionSelected"
                  :length="termsAndConditionsVersions"
                ></v-pagination>
              </div>
            </v-col>
            <v-col cols="12" md="8">
              <NestedList
                title="Glossary"
                :items="preambles"
                class="mt-4"
              ></NestedList>
              <NestedList
                title="Preambles"
                :items="preambles"
                class="mt-4"
              ></NestedList>
              <NestedList
                title="Articles"
                :items="preambles"
                class="mt-4"
              ></NestedList>
            </v-col>
          </v-row>
        </div>

        <div v-if="selectedItem === 1">
          <div class="mt-2 text-body-1">
            Formed on
            <v-chip color="" class="" small>12 dec. 2021</v-chip>, based on
            <v-chip color="" class="" small>starter template</v-chip>
          </div>

          <div class="mt-2 text-body-1">
            <v-chip color="" class="" small>26</v-chip>
            changes have been made so far
          </div>
          <v-row justify="start" class="mt-4">
            <v-col cols="12" md="4">
              <v-text-field
                solo
                label="Search"
                append-icon="mdi-magnify"
                class="mt-4"
              ></v-text-field>
            </v-col>
          </v-row>

          <div>
            <div class="d-flex justify-start text-h4 primary--text mt-8 mb-8">
              Memberships & roles
            </div>
            <v-row justify="start">
              <v-col cols="12" md="3">
                <ProposalTypeCard
                  icon="mdi-account-plus"
                  title="Membership invitation"
                ></ProposalTypeCard>
              </v-col>
              <v-col cols="12" md="3">
                <ProposalTypeCard
                  icon="mdi-account-minus"
                  title="Membership termination"
                ></ProposalTypeCard>
              </v-col>
              <v-col cols="12" md="3">
                <ProposalTypeCard
                  icon="mdi-account-settings"
                  title="Role assignment"
                ></ProposalTypeCard>
              </v-col>
              <v-col cols="12" md="3">
                <ProposalTypeCard
                  icon="mdi-format-list-bulleted"
                  title="Role management"
                ></ProposalTypeCard>
              </v-col>
            </v-row>
            <v-divider class="mt-8"></v-divider>
          </div>

          <div>
            <div class="d-flex justify-start text-h4 primary--text mt-8 mb-8">
              Polls
            </div>
            <v-row justify="start">
              <v-col cols="12" md="3">
                <ProposalTypeCard
                  icon="mdi-ballot"
                  title="Yes / No"
                ></ProposalTypeCard>
              </v-col>
              <v-col cols="12" md="3">
                <ProposalTypeCard
                  icon="mdi-view-list-outline"
                  title="Multi option"
                ></ProposalTypeCard>
              </v-col>
            </v-row>
            <v-divider class="mt-8"></v-divider>
          </div>

          <div>
            <div class="d-flex justify-start text-h4 primary--text mt-8 mb-8">
              Profile
            </div>
            <v-row justify="start">
              <v-col cols="12" md="3">
                <ProposalTypeCard
                  icon="mdi-form-textbox"
                  title="Name change"
                ></ProposalTypeCard>
              </v-col>
              <v-col cols="12" md="3">
                <ProposalTypeCard
                  icon="mdi-tag"
                  title="Tag change"
                ></ProposalTypeCard>
              </v-col>
              <v-col cols="12" md="3">
                <ProposalTypeCard
                  icon="mdi-bullseye-arrow"
                  title="Mission change"
                ></ProposalTypeCard>
              </v-col>
              <v-col cols="12" md="3">
                <ProposalTypeCard
                  icon="mdi-eye"
                  title="Vision change"
                ></ProposalTypeCard>
              </v-col>
              <v-col cols="12" md="3">
                <ProposalTypeCard
                  icon="mdi-image"
                  title="Icon change"
                ></ProposalTypeCard>
              </v-col>
              <v-col cols="12" md="3">
                <ProposalTypeCard
                  icon="mdi-image-size-select-actual"
                  title="Logo change"
                ></ProposalTypeCard>
              </v-col>
            </v-row>
            <v-divider class="mt-8"></v-divider>
          </div>

          <div>
            <div class="d-flex justify-start text-h4 primary--text mt-8 mb-8">
              Constitution
            </div>
            <v-row justify="start">
              <v-col cols="12" md="3">
                <ProposalTypeCard
                  icon="mdi-bank"
                  title="Bill"
                ></ProposalTypeCard>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>
export default {
  layout: "auton",
  data: () => ({
    dialog: true,
    selectedItem: "",
    termsAndConditionsVersionSelected: 15,
    termsAndConditionsVersions: 15,
    tabItemsDefault: [
      {
        icon: "mdi-scale-balance",
        title: "Terms & Conditions",
      },
      {
        icon: "mdi-email-newsletter",
        title: "Proposal types",
      },
      {
        icon: "mdi-cog",
        title: "Policies",
      },
    ],
    preambles: [
      {
        id: "a",
        title: "123",
        content: "abc",
      },
    ],
  }),
  mounted() {
    this.$nuxt.$emit("Auton-setPage", "constitution");
  },
};
</script>