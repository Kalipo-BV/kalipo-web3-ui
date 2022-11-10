/* Kalipo B.V. - the DAO platform for business & societal impact 
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
 */

export const state = () => ({
    unlocked: false,
    account: {},
    accounts: []
})

export const mutations = {
    init(state, accounts) {
        state.accounts = accounts;
    },
    add(state, acc) {
        state.accounts.push(acc)
    },
    remove(state, { acc }) {
        state.accounts.splice(state.accounts.indexOf(acc), 1)
    },
    unlock(state, acc) {
        state.account = acc
        state.unlocked = true
    },
    lock(state) {
        state.account = {}
        state.unlocked = false
    }
}