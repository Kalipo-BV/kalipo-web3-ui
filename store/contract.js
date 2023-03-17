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
	parties: [],
	preample: "",
	purpose: "",
	payment: {amount: 0, note:""},
	dates: {start: null, end: null},
	ipRights: "",
	termination: "",
	law: "",
	final: "",
	milestones: [],
	custom: {},
})

export const mutations = {
	addParty(state, party) {
		state.parties.push(party);
	},

	removeParty(state, party) {
		const index = state.parties.indexOf(party);
		if (index > -1) { // only splice array when item is found
			state.parties.splice(index, 1); // 2nd parameter means remove one item only
		}
	},

	changePreample(state, payload) {
		if (isString(payload, 'preample')) {
			state.preample = payload;
		}
	},

	changePurpose(state, payload) {
		if (isString(payload, 'purpose')) {
			state.purpose = payload;
		}
	},

	changePaymentAmount(state, payload) {
		if (isNumber(payload, 'payment amount')) {
			state.payment.amount = payload;
		}
	},

	changePaymentNote(state, payload) {
		if (isString(payload, 'paymentNote')) {
			state.payment.note = payload;
		}
	},

	changeStartDate(state, payload) {
		if (isDate(payload, 'startDate')) {
			state.dates.start = payload;
		}
	},

	changeEndDate(state, payload) {
		if (isDate(payload, 'endDate')) {
			state.dates.end = payload;
		}
	}
}

export const getters = {
	parties(state) {
		return state.parties;
	},

	preample(state) {
		return state.preample;
	},

	purpose(state) {
		return state.purpose;
	},

	paymentAmount(state) {
		return state.payment.amount;
	},

	paymentNote(state) {
		return state.payment.note;
	},

	startDate(state) {
		return state.dates.start;
	},

	endDate(state) {
		return state.dates.end;
	}
}


const isString = (payload, errorName) => {
	const result = (typeof payload === 'string');
	logError(result, errorName);

	return result;
}

const isNumber = (payload, errorName) => {
	const result = (typeof Number.parseFloat(payload) === 'number');
	logError(result, errorName);

	return result;
}

const isDate = (payload, errorName) => {
	const result = (payload instanceof DATE);
	logError(result, errorName);

	return result;
}

const logError = (bool, errorName) => {
	if (!bool) {
		console.error(`invalid ${errorName} given`, payload);
	}
}