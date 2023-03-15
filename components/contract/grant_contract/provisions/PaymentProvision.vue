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
        <v-text-field
            style="padding: 1px"
            label="Payment amount"
            prepend-icon="mdi-cash-multiple" 
            type="number"
            clearable
            required
            :rules="[v => v > 0 || 'This field can\'t be left open (>0)!']"
        />

        <v-textarea
            rows="1"
            solo
            clearable
            label="Payment note"
            auto-grow
            hide-details="auto"
            prepend-icon="mdi-receipt-text-plus-outline" 
            style="padding-bottom: 5px;"
        />
    </div>
</template>