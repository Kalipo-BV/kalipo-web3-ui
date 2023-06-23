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

import { isArray, isObject, isBoolean, isDate, isNumber, isId, isString, isValidPartyData, isNotNull, objectIsSameLength, genericErrorChecking } from "./validation.js"
import { getAllFromLocalStorage, saveNewToLocalStorage, saveToLocalStorage, getFromLocalStorage, normalizeContract } from "./localstorage.js"
import { initFormData, initContract } from "./initData.js";

/**
 * initializes the state of the contract with its main variables and can be reused by other parts
 */
function initState () {
	return {
		body: initContract(),
		id: -1,
		loadError: false,
		allContracts: getAllFromLocalStorage,// is used as prop because getters are cached based on props
	}
}

/**
 * uses the method to initialize the state
 */
export const state = () => (
	initState()
)

export const mutations = {
	/**
	 * reacte a new local contract without any variable and loads it
	 */
	createNew() {
		const id = saveNewToLocalStorage(initContract());
		this.commit("contract/loadContract", { id: id });
	},

	/**
	 * loads contract from localstorage into the store
	 */
	loadContract(state, payload) {
		const id = payload.id;

		if (!isId(id)) {
			state.loadError = true;
			state.id = -1;
			console.error(`[contract Store] invalid id given while loading the contract the id=${id}`);
			return;
		}
		
		const contract = getFromLocalStorage(id);	
		if (isNotNull(contract)) {
			state.body = contract;
			state.id = id;
			state.loadError = false;
			return;
		
		} else {
			state.loadError = true;
			state.id = -1;
			console.error(`[contract Store] contract cant be loaded contract with id:${id} = null \n Maybe it doesnt exist in the local storage`);
		}
	},

	/**
	 * This function is used to make a new localcopy base on given data
	 */
	createNewLocalCopy(state, data) {
		const id = saveNewToLocalStorage(initContract());
		const contract = getFromLocalStorage(id);
		const {contractData, tid, version} = data;

		if(isNotNull(contract, "contract is null")) {
			objectIsSameLength(contractData, contract.formData, true);

			for (let dataKey in contract.formData) {
				const newData = contractData[dataKey];

				if (newData != undefined) {
					contract.formData[dataKey] = newData;
				} else {
					console.warn(`the property key:${dataKey} does not exist in the payload and therefore can not be set`);
				}			
			}		

			state.body.formData = contract.formData 
			state.id = id;
		}

		state.body.tid = tid;
		state.body.version = version;

		saveToLocalStorage(contract, id);
	},

	/**
	 * remove an user from parties in the loaded contract and save it
	 */
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

	/**
	 * change a string with a key given by the component in the loaded contract and save it
	 */
	changeString(state, payload) {
		if (genericErrorChecking(payload, state) ) {
			if (isString(payload.content, `invalid ${payload.key} given`)) {
				state.body.formData[payload.key] = payload.content;
				saveToLocalStorage(state.body, state.id);
			}
		}
	},

	/**
	 * change a date with a key given by the component in the loaded contract and save it
	 */
	changeDate(state, payload) {
		if (genericErrorChecking(payload, state, 'date')) {
			if (isDate(payload.content, `invalid ${payload.key} given`)) {
				state.body.formData.dates[payload.key] = payload.content;
				saveToLocalStorage(state.body, state.id);
			}
		}
	},

	/**
	 * Add a party to the loaded contract
	 */
	changeParties(state, payload) {
		if (isValidPartyData(payload) && isArray(payload.data, `parties[${payload.target}]_data`)) {
			state.body.formData.parties[payload.target] = payload.data;
			saveToLocalStorage(state.body, state.id);
		}
	},

	/**
	 * Change the paymentNote in the loaded contract
	 */
	changePaymentNote(state, payload) {
		if (isString(payload, 'invalid paymentNote given')) {
			state.body.formData.payment.note = payload;
			saveToLocalStorage(state.body, state.id);
		}
	},

	/**
	 * Change the requiredSign in the loaded contract
	 */
	changeRequiredSign(state, payload) {
		if (isBoolean(payload, 'invalid required to sign given')) {
			state.body.formData.purpose = payload;
			saveToLocalStorage(state.body, state.id);
		}
	},

	/**
	 * Change the paymentAmount in the loaded contract
	 */
	changePaymentAmount(state, payload) {
		if (isNumber(payload, 'invalid paymentAmount given')) {
			state.body.formData.payment.amount = Number.parseFloat(payload);
			saveToLocalStorage(state.body, state.id);
		}
	},

	/**
	 * resets all variables in the local contract to the default value
	 */
	reset(state) {
		state.formData = initFormData();
		saveToLocalStorage(state.body, state.id);
	},
}

export const getters = {
	/**
	 * Get filteredData to check the data before sending it to the backend
	 */
	filtered: (state) => {
		return normalizeContract(state.body);
	},
}