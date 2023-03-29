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
	<v-sheet width="90%" class="mx-auto pa-10" style="margin-top: 10vh; margin-bottom: 12vh;">
	    <h1 style="margin-bottom: 10px; text-align: center;">{{ title }}</h1>
			<v-row justify="center">
				<v-col>
					<slot></slot>
				</v-col>
			</v-row>
			
			<v-row justify="end">
				<v-col v-if="isFirst">
					<v-btn disabled 
					>Previous</v-btn>
				</v-col>

				<v-col v-else>
					<v-btn  
						@click="previous"
					>Previous</v-btn>
				</v-col>
							
				<v-col align="right">
					<v-btn
						style="background-color: #002060; color: white"
						@click="save"
					>Save</v-btn>
					<v-btn
						class="accent"
						@click="next"
					>Next</v-btn>
				</v-col>
			</v-row>
			<v-row>
				<v-alert
					v-if="saving"
					v-model="saving"
					width="100%"
					dense
					dismissible
					elevation="5"
					outlined
					prominent
					type="success"
				>The contract has corectly been saved! ({{ this.saved }})</v-alert>
			</v-row>
	  </v-sheet>
</template>
<script>
export default {
	props: {
		isFirst: Boolean,
		title: String
	},

    data: () => ({
      saving: false,
	  saved: 0,
    }),

	methods: {
		previous: function() {
			this.resetSave();
			this.$emit('previous', null);
		},

		next: function() {
			this.resetSave();
			this.$emit('next', null);
		},

		resetSave() {
			this.saving = false;
			this.saved = 0;
		},

		save: function() {
			// console.log(this.$store.state);
			localStorage.setItem("Grant-Contract", this.$store.state.contract);
			if(localStorage.getItem("Grant-Contract") != null) {
				this.saving = true;
				this.saved++;
			}
		},
	},
}
</script>