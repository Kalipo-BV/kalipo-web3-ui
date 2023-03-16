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
	    <h1 style="margin-bottom: 10px;">{{ title }}</h1>
				<v-row>
					<v-col cols="2">
						<button v-if="!isFirst" @click="previous">previous</button>
					</v-col>
					<v-col cols="8">
							<slot></slot>
					</v-col>
					<v-col cols="2">
						<button @click="next">next</button>
					</v-col>
				</v-row>
	  </v-sheet>
</template>
<script>
export default {
	props: {
		isFirst: Boolean,
		title: String
	},

	methods: {
		previous: function() {
			this.$emit('previous', null);
		},
		next: function() {
			this.$emit('next', null);
		}

	},
}
</script>