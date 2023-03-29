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

import { isArray, isObject, isBoolean, isDate, isNumber, isString, isValidPartyData } from "./validation.js"

const initFormData = () => {
	return {
		parties: {
			contractor: [],
			client: []
		},
		preample: null,
		purpose: null,
		payment: {
			amount: null,
			note: null,
		},
		dates: {
			startDate: new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().substr(0, 10),
			endDate: new Date(new Date().setDate(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).getDate() + 1)).toISOString().substr(0, 10),
		},
		propertyRights: null,
		terminationOfAgreement: null,
		governingLawAndJurisdiction: null,
		finalProvisions: null,
		milestones: [],
		custom: [],
		signingWindow: 0,
		requiredToSign: false,
		signed: false,
	}
}

export const state = () => ({
	editFase: 3,
	status: "",
	type: "Grant Contract",
	fullySigned: false,
	date: new Date().toISOString(),
	formData: initFormData()
})

export const mutations = {
	// addPartyArray(state, payload) {
	// 	if (isValidPartyData(payload) && isString(payload.data, `parties[${payload.target}]_data`) ) {
	// 		state.formData.parties[payload.target].push(payload.data);
	// 	}
	// },

	removeFromParties(state, payload) {
		if (isValidPartyData(payload) ) {
			const currentParty = state.formData.parties[payload.target];
			const index = currentParty.indexOf(payload.data.id);
			if (index > -1) { // only splice array when item is found
				currentParty.splice(index, 1); // 2nd parameter means remove one item only
			}
		}
	},

	changeParties(state, payload) {
		if (isValidPartyData(payload) && isArray(payload.data, `parties[${payload.target}]_data`)) {
			state.formData.parties[payload.target] = payload.data;
		}
	},

	changePreample(state, payload) {
		if (isString(payload, 'preample')) {
			state.formData.preample = payload;
		}
	},

	changePropertyRights(state, payload) {
		if (isString(payload, 'propertyRights')) {
			state.formData.propertyRights = payload;
		}
	},

	changeGoverningLawAndJurisdiction(state, payload) {
		if (isString(payload, 'governingLawAndJurisdiction')) {
			state.formData.governingLawAndJurisdiction = payload;
		}
	},

	changeRequiredSign(state, payload) {
		if (isBoolean(payload, 'required to sign')) {
			state.formData.purpose = payload;
		}
	},

	changePurpose(state, payload) {
		if (isString(payload, 'purpose')) {
			state.formData.purpose = payload;
		}
	},

	changeFinalProvisions(state, payload) {
		if (isString(payload, 'finalProvision')) {
			state.formData.finalProvisions = payload;
		}
	},

	changePaymentAmount(state, payload) {
		if (isNumber(payload, 'payment amount')) {
			state.formData.payment.amount = payload;
		}
	},

	changePaymentNote(state, payload) {
		if (isString(payload, 'paymentNote')) {
			state.formData.payment.note = payload;
		}
	},

	changeStartDate(state, payload) {
		if (isDate(payload, 'startDate')) {
			state.formData.dates.startDate = payload;
		}
	},

	changeEndDate(state, payload) {
		if (isDate(payload, 'endDate')) {
			state.formData.dates.endDate = payload;
		}
	},

	changeCustom(state, payload) {
		if (isArray(payload, 'customProvision')) {
			state.formData.custom = payload;
		}
	},

	changeCustom(state, payload) {
		if (isArray(payload, 'custom')) {
			state.formData.custom = payload;
		}
	},

	customAddProvision(state, item) {
		state.formData.custom.push(item);
	},

	customRemoveProvision(state, index) {
		state.formData.custom.splice(index, 1)
	},

	customChangeType(state, payload) {
		state.formData.custom[payload.index].type = payload.data;
	},

	customChangeInfo(state, payload) {
		state.formData.custom[payload.index].info = payload.data;
	},

	customChangeData(state, payload) {
		state.formData.custom[payload.index].data = payload.data;
	},

	reset(state) {
		state.formData = initFormData();
	}
}

export const getters = {
	getContract: (state) => {
		return retreiveData(state);
	}
}

export const actions = {
	loadPreviousState({commit}, previousState) {
		commit("reset");

		//load data here
		console.log("test load", previousState);
	},

	saveState({getters}) {
		//save date to localstore
		const oldState = getters["getContract"];
		console.log("test save", oldState);
	}
}

function retreiveData(state) {
	const result = {};

	for (const key in state) {
		const currentProp = state[key];
		const isObject = (typeof currentProp === 'object' && !Array.isArray(currentProp));
		if (isObject) {
			const data = retreiveData(currentProp);
			if (Object.keys(data).length > 0) {
				result[key] = data;
			}
		
		} else if (Array.isArray(currentProp) ) {
			
			if (currentProp.length > 0) {
				result[key] = currentProp;
			}

		} else if (currentProp !== "" && currentProp !== null && currentProp !== undefined) {
			result[key] = currentProp;
		}
	}

	return result;
}