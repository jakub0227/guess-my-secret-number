import * as actionTypes from './recordActionTypes'
import {AddRecordAction, RecordState} from './recordReducer'

export const addRecord = (id: string, date: string, attempts: number, guessNumber: number): AddRecordAction => ({
	type: actionTypes.ADD_RECORD,
	payload: {
		id: id,
		date: date,
		attempts: attempts,
		guessNumber: guessNumber,
	},
})

export const initRecords = (records: RecordState) => ({
	type: actionTypes.INIT_RECORDS,
	payload: {
		records,
	},
})

//initRecords z localstorage