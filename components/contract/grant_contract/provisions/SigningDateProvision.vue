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
	<!-- <v-container style="min-width: 100%;">
		<v-row>
			<v-col cols="12" lg="6" class="fieldContainer">4

				<v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y
					max-width="290px" min-width="auto">
					<template v-slot:activator="{ on, attrs }">
						<v-text-field readonly outlined :value=signingDate label="Ultimate signing data" hint="YYYY/MM/DD format" persistent-hint
							v-bind="attrs" v-on="on"
							:rules="[v => !!v || 'A signingDate must be selected!', signingDate >= (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10) || 'The signingDate must be in the future or today'].flat()">
						</v-text-field>
					</template>
					<v-date-picker @input="(e) => { signingDate = e }" :value=signingDate no-title></v-date-picker>
				</v-menu>
			</v-col>

			
		</v-row>
	</v-container> -->

	<v-menu
		v-model="menu1"
		:close-on-content-click="false"
		transition="scale-transition"
		offset-y
		max-width="290px"
		min-width="auto"
	>
		<template v-slot:activator="{ on, attrs }">
			<v-text-field
				readonly
				outlined
				:value=signingDate
				label="ultimate signing date"
				hint="YYYY/MM/DD format"
				persistent-hint
				v-bind="attrs"
				v-on="on"
				:rules="[v => !!v || 'An signing date must be selected!']"
			></v-text-field>
		</template>
		<v-date-picker
				@input="(e) => { signingDate = e }"
				:value=signingDate
				no-title
		></v-date-picker>
	</v-menu>
</template>
<script>
export default {
	computed: {
		signingDate: {
			get: function () {
				const data = this.$store.state.contract.body.formData.dates['signingDate'];

				if (typeof data === 'string') {
					return data;
				} else {
					console.error('data is invalid', data)
					return '';
				}
			},
			set: function (content) {
				this.$store.commit("contract/changeDate", { key: 'signingDate', content: content });
			},
		},
	},

	// signingDate

	data: vm => ({
		menu1: false,
	}),
}
</script>