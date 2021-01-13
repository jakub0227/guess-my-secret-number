import * as actionTypes from '../actions/actionTypes'

export const setRecord = (date: string, attempts: number, id: string, guessNumber: number) => ({
	type: actionTypes.SET_RECORD_ACTION,
	payload: {
		date: date,
		attempts: attempts,
		id: id,
		guessNumber: guessNumber,
	},
})