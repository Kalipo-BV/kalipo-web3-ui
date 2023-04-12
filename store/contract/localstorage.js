import { isValidContract } from "./validation.js"

export const saveToLocalstorage = (contract) => {
	const data = JSON.stringify(contract);
	localStorage.setItem("Agreements", data);
}

export const getFromLocalstorage = () => {
	if (localStorage.getItem("Agreements") == null) {
		console.warning("no Agreements in localstorage");
		return null;
	}

	const contract = JSON.parse(localStorage.getItem("Agreements"));

	if (!isValidContract(contract)) {
		console.error(`no valid contract in local storage\n\n ${contract}`);
	}

	return contract;
}