import { isValidContract } from "./validation.js"
import { initContract } from "./initData.js";

export const saveToLocalStorage = (contract, id = 0) => {
	const data = putContractToLocalStorage(contract, id);
	saveInLocalStorage(data);
}

export const saveNewToLocalStorage = (contract) => {
	const data = addContractToLocalStorage(contract);
	saveInLocalStorage(data);
	
	return id;
}

export const getFromLocalStorage = (id = 0) => {
	const contracten = getNormalizedLocalStorageData();
	const contract = contracten[id];

	if (!isValidContract(contract)) {
		console.warn("getFromLocalstorage uses a fallback to fill the holes in its required dataStructure");
		return normalizeContract(contract);;
	}

	return contract;
}


export const normalizeContract = (contract) => {
	return extractDataByObject(initContract(), contract);
}

/**
 * this function creates a object in the format of the required object
 * every field that matches in the given object will be copied over
 * every missing field will be created empty
 * 
 * This method does this recursively for all objects within the required object
 * currently this method does not support 2d arrays, 3d+ arrays and objects within arrays
 */
function extractDataByObject(requiredObject, givenObject) {
	const result = {};

	for (const key in requiredObject) {
		const currentRequiredProp = requiredObject[key];
		const currentGivenProp    = givenObject[key];

		if (currentGivenProp === undefined || currentGivenProp === null) {
			result[key] = currentRequiredProp;
			console.warn(`uses a fallback for the following key -> ${key}\n key is not defined or null`);
			continue;
		}


		const isRequiredPropObject = (typeof currentRequiredProp === 'object' && !Array.isArray(currentRequiredProp));
		const isGivenPropObject = (typeof currentGivenProp === 'object' && !Array.isArray(currentGivenProp));
		if (isRequiredPropObject) {
			if (isGivenPropObject) {
				const data = extractDataByObject(currentRequiredProp, currentGivenProp);
				result[key] = data;

			} else {
				result[key] = currentRequiredProp
				console.warn(`uses a fallback for the following key -> ${key}\n key is not an object`);
			}
			continue;
		}


		
		if (Array.isArray(currentRequiredProp)) {
			if (Array.isArray(currentGivenProp)) {
				result[key] = currentGivenProp;
			} else {
				result[key] = currentRequiredProp
				console.warn(`uses a fallback for the following key -> ${key}\n key is not an array`);
			}
			continue;
		}

		result[key] = currentGivenProp;
	}
	return result;
}


function getHighestKeyInLocalStorage() {
	const data = getNormalizedLocalStorageData();
	const keys = Object.keys(data);
	return Math.max(...keys);
};

function addContractToLocalStorageData(contract) {
	const newKey = getHighestKeyInLocalStorage() +1;
	return putContractToLocalStorage(contract, newKey)
}

function putContractToLocalStorageData(contract, id) {
	const data = getNormalizedLocalStorageData();
	data[id] = contract;

	return data;
}

function saveInLocalStorage(data) {
	const dataJson = JSON.stringify(data);
	localStorage.setItem("Agreements", dataJson);
}

function getNormalizedLocalStorageData() {
	const localStorageReference = localStorage.getItem("Agreements");
	if (localStorageReference == null) {
		return {};
	}

	return JSON.parse(localStorageReference);
}