/**
 * this method returns the contract.body for the main contract
 */
export const initContract = () => {
	return {
		editFase: 3,
		status: "",
		type: "Grant Contract",
		fullySigned: false,
		date: new Date().toISOString(),
		formData: initFormData(),
		tid: "",
		version: "",
	}
}

/**
 * this method returns the main fromData for contract.body.formData for the main contract
 */
export const initFormData = () => {
	return {
		parties: {
			contractor: [],
			client: []
		},
		preample: "",
		purpose: "",
		payment: {
			amount: "",
			note: "",
		},
		dates: {
			startDate: new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().substr(0, 10),
			endDate: new Date(new Date().setDate(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).getDate() + 1)).toISOString().substr(0, 10),
			signingDate: new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().substr(0, 10),
		},
		propertyRights: "",
		terminationOfAgreement: "",
		governingLawAndJurisdiction: "",
		finalProvisions: "",
		requiredToSign: false,
		signed: false,
		title: '',
		productDescription: '',
	}
}