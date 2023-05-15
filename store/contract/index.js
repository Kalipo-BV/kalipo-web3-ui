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

import { isArray, isObject, isBoolean, isDate, isNumber, isId, isString, isValidPartyData, isNotNull } from "./validation.js"
import { saveNewToLocalStorage, saveToLocalStorage, getFromLocalStorage, normalizeContract } from "./localstorage.js"
import { initFormData, initContract } from "./initData.js";

// const loadState = () => {
// 	const contract = getFromLocalStorage();
// 	if (contract === null) {
// 		return initState();
// 	}

// 	return contract;
// }

function initState () {
	return {
		body: initContract(),
		id: -1
	}
}

export const state = () => (
	initState()
)

export const mutations = {
	
	createNew() {
		const id = saveNewToLocalStorage(initContract());
		this.commit("contract/loadContract", { id: id });
	},

	loadContract(state, payload) {
		const id = payload.id;

		if (!isId(id, "id")) {
			return;
		}
		
		const contract = getFromLocalStorage(id);	
		if (isNotNull(contract, "contract is null")) {
			state.body = contract;
			state.id = id;
		}		
	},

	removeFromParties(state, payload) {
		if (isValidPartyData(payload) ) {
			const currentParty = state.body.formData.parties[payload.target];
			const index = currentParty.indexOf(payload.data.id);
			if (index > -1) { // only splice array when item is found
				currentParty.splice(index, 1); // 2nd parameter means remove one item only
			}
			saveToLocalStorage(state.body, state.id);
		}
	},

	changeParties(state, payload) {
		if (isValidPartyData(payload) && isArray(payload.data, `parties[${payload.target}]_data`)) {
			state.body.formData.parties[payload.target] = payload.data;
			saveToLocalStorage(state.body, state.id);
		}
	},

	changePreample(state, payload) {
		if (isString(payload, 'invalid preample given')) {
			state.body.formData.preample = payload;
			saveToLocalStorage(state.body, state.id);
		}
	},

	changePropertyRights(state, payload) {
		if (isString(payload, 'invalid propertyRights given')) {
			state.body.formData.propertyRights = payload;
			saveToLocalStorage(state.body, state.id);
		}
	},

	changeGoverningLawAndJurisdiction(state, payload) {
		if (isString(payload, 'invalid governingLawAndJurisdiction given')) {
			state.body.formData.governingLawAndJurisdiction = payload;
			saveToLocalStorage(state.body, state.id);
		}
	},

	changeRequiredSign(state, payload) {
		if (isBoolean(payload, 'invalid required to sign given')) {
			state.body.formData.purpose = payload;
			saveToLocalStorage(state.body, state.id);
		}
	},

	changePurpose(state, payload) {
		if (isString(payload, 'invalid purpose given')) {
			state.body.formData.purpose = payload;
			saveToLocalStorage(state.body, state.id);
		}
	},

	changeFinalProvisions(state, payload) {
		if (isString(payload, 'invalid finalProvision given')) {
			state.body.formData.finalProvisions = payload;
			saveToLocalStorage(state.body, state.id);
		}
	},

	changePaymentAmount(state, payload) {
		if (isNumber(payload, 'invalid paymentAmount given')) {
			state.body.formData.payment.amount = Number.parseFloat(payload);
			saveToLocalStorage(state.body, state.id);
		}
	},

	changePaymentNote(state, payload) {
		if (isString(payload, 'invalid paymentNote given')) {
			state.body.formData.payment.note = payload;
			saveToLocalStorage(state.body, state.id);
		}
	},

	changeStartDate(state, payload) {
		if (isDate(payload, 'invalid startDate given')) {
			state.body.formData.dates.startDate = payload;
			saveToLocalStorage(state.body, state.id);
		}
	},

	changeEndDate(state, payload) {
		if (isDate(payload, 'invalid endDate given')) {
			state.body.formData.dates.endDate = payload;
			saveToLocalStorage(state.body, state.id);
		}
	},

	changeCustom(state, payload) {
		if (isArray(payload, 'invalid customProvision given')) {
			state.body.formData.custom = payload;
			saveToLocalStorage(state.body, state.id);
		}
	},

	changeCustom(state, payload) {
		if (isArray(payload, 'invalid custom given')) {
			state.body.formData.custom = payload;
			saveToLocalStorage(state.body, state.id);
		}
	},

	customAddProvision(state, item) {
		state.body.formData.custom.push(item);
		saveToLocalStorage(state.body, state.id);
	},

	customRemoveProvision(state, index) {
		state.body.formData.custom.splice(index, 1);
		saveToLocalStorage(state.body, state.id);
	},

	customChangeType(state, payload) {
		state.body.formData.custom[payload.index].type = payload.data;
		saveToLocalStorage(state.body, state.id);
	},

	customChangeInfo(state, payload) {
		state.body.formData.custom[payload.index].info = payload.data;
		saveToLocalStorage(state.body, state.id);
	},

	customChangeData(state, payload) {
		state.body.formData.custom[payload.index].data = payload.data;
		saveToLocalStorage(state.body, state.id);
	},

	changeTerminationOfAgreement(state, payload) {
		if (isString(payload, 'invalid terminationOfAgreement given')) {
			state.body.formData.terminationOfAgreement = payload;
		}
	},

	reset(state) {
		state.formData = initFormData();
		saveToLocalStorage(state.body, state.id);
	},
}

export const getters = {
	filtered: (state) => {
		return normalizeContract(state.body);
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