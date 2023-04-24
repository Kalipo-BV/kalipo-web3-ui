export const initState = () => {
	return {
		editFase: 3,
		status: "",
		type: "Grant Contract",
		fullySigned: false,
		date: new Date().toISOString(),
		formData: initFormData()
	}
}

export const initFormData = () => {
	return {
		parties: {
			contractor: [],
			client: [],
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
		signingWindow: null,
		requiredToSign: false,
		signed: false,

		// parties: {
		// 	contractor: [
		// 		"f2131b1ec164f1e32f148378d9b61ba9fbddef1d9b6b212028ddd86f2b554db6",
		// 		"b61d53937da7a3c9d81ea5a9cdcb88de3a742494d61d0c415fd50373c6dc8215"
		// 	],
		// 	client: [
		// 		"f2131b1ec164f1e32f148378d9b61ba9fbddef1d9b6b212028ddd86f2b554db6",
		// 		"b61d53937da7a3c9d81ea5a9cdcb88de3a742494d61d0c415fd50373c6dc8215"
		// 	]
		// },
		// preample: "123123",
		// purpose: "231123123",
		// payment: {
		// 	amount: 132,
		// 	note: "123123"
		// },
		// dates: {
		// 	startDate: "2023-04-05",
		// 	endDate: "2023-04-06"
		// },
		// propertyRights: "123123",
		// terminationOfAgreement: "asdadad",
		// governingLawAndJurisdiction: "wdadawdawd",
		// finalProvisions: "123123",
		// milestones: [],
		// custom: [],
		// signingWindow: "",
		// requiredToSign: false,
		// signed: false
	}
}