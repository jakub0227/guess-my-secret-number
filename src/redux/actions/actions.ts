import * as actionTypes from '../actions/actionTypes'
import {AddRecordAction, State} from '../reducers/reducer'

export const addRecord = (id: string, date: string, attempts: number, guessNumber: number): AddRecordAction => ({
	type: actionTypes.ADD_RECORD,
	payload: {
		id: id,
		date: date,
		attempts: attempts,
		guessNumber: guessNumber,
	},
})

export const initRecords = (records: State) => ({
	type: actionTypes.INIT_RECORDS,
	payload: {
		records,
	},
})

//initRecords z localstorage