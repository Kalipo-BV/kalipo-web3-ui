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
		contract: initContract(),
		id: -1
	}
}

export const state = () => (
	initState()
)

export const mutations = {
	createNew(state) {
		const id = saveNewToLocalStorage();
		this.loadContract(state, {id: id});
	},

	loadContract(state, payload) {
		const id = (payload.id ? payload.id: -1);
		if (id < 0) {
			return;
		}
	
		const contract = getFromLocalStorage(id);	
		if (contract == null) {
			return;
		}

		state.contract = payload.contract;
		state.id = id;
	},

	removeFromParties(state, payload) {
		if (isValidPartyData(payload) ) {
			const currentParty = state.contract.formData.parties[payload.target];
			const index = currentParty.indexOf(payload.data.id);
			if (index > -1) { // only splice array when item is found
				currentParty.splice(index, 1); // 2nd parameter means remove one item only
			}
			saveToLocalStorage(state.contract, state.id);
		}
	},

	changeParties(state, payload) {
		if (isValidPartyData(payload) && isArray(payload.data, `parties[${payload.target}]_data`)) {
			state.contract.formData.parties[payload.target] = payload.data;
			saveToLocalStorage(state.contract, state.id);
		}
	},

	changePreample(state, payload) {
		if (isString(payload, 'preample')) {
			state.contract.formData.preample = payload;
			saveToLocalStorage(state.contract, state.id);
		}
	},

	changePropertyRights(state, payload) {
		if (isString(payload, 'propertyRights')) {
			state.contract.formData.propertyRights = payload;
			saveToLocalStorage(state.contract, state.id);
		}
	},

	changeGoverningLawAndJurisdiction(state, payload) {
		if (isString(payload, 'governingLawAndJurisdiction')) {
			state.contract.formData.governingLawAndJurisdiction = payload;
			saveToLocalStorage(state.contract, state.id);
		}
	},

	changeRequiredSign(state, payload) {
		if (isBoolean(payload, 'required to sign')) {
			state.contract.formData.purpose = payload;
			saveToLocalStorage(state.contract, state.id);
		}
	},

	changePurpose(state, payload) {
		if (isString(payload, 'purpose')) {
			state.contract.formData.purpose = payload;
			saveToLocalStorage(state.contract, state.id);
		}
	},

	changeFinalProvisions(state, payload) {
		if (isString(payload, 'finalProvision')) {
			state.contract.formData.finalProvisions = payload;
			saveToLocalStorage(state.contract, state.id);
		}
	},

	changePaymentAmount(state, payload) {
		console.log(payload)
		if (isNumber(payload, 'paymentAmount')) {
			state.contract.formData.payment.amount = Number.parseFloat(payload);
			saveToLocalStorage(state.contract, state.id);
		}
	},

	changePaymentNote(state, payload) {
		if (isString(payload, 'paymentNote')) {
			state.contract.formData.payment.note = payload;
			saveToLocalStorage(state.contract, state.id);
		}
	},

	changeStartDate(state, payload) {
		if (isDate(payload, 'startDate')) {
			state.contract.formData.dates.startDate = payload;
			saveToLocalStorage(state.contract, state.id);
		}
	},

	changeEndDate(state, payload) {
		if (isDate(payload, 'endDate')) {
			state.contract.formData.dates.endDate = payload;
			saveToLocalStorage(state.contract, state.id);
		}
	},

	changeCustom(state, payload) {
		if (isArray(payload, 'customProvision')) {
			state.contract.formData.custom = payload;
			saveToLocalStorage(state.contract, state.id);
		}
	},

	changeCustom(state, payload) {
		if (isArray(payload, 'custom')) {
			state.contract.formData.custom = payload;
			saveToLocalStorage(state.contract, state.id);
		}
	},

	customAddProvision(state, item) {
		state.contract.formData.custom.push(item);
		saveToLocalStorage(state.contract, state.id);
	},

	customRemoveProvision(state, index) {
		state.contract.formData.custom.splice(index, 1);
		saveToLocalStorage(state.contract, state.id);
	},

	customChangeType(state, payload) {
		state.contract.formData.custom[payload.index].type = payload.data;
		saveToLocalStorage(state.contract, state.id);
	},

	customChangeInfo(state, payload) {
		state.contract.formData.custom[payload.index].info = payload.data;
		saveToLocalStorage(state.contract, state.id);
	},

	customChangeData(state, payload) {
		state.contract.formData.custom[payload.index].data = payload.data;
		saveToLocalStorage(state.contract, state.id);
	},

	changeTerminationOfAgreement(state, payload) {
		if (isString(payload, 'terminationOfAgreement')) {
			state.contract.formData.terminationOfAgreement = payload;
		}
	},

	reset(state) {
		state.formData = initFormData();
		saveToLocalStorage(state.contract, state.id);
	},
}

export const getters = {
	filtered: (state) => {
		return normalizeContract(state.contract);
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