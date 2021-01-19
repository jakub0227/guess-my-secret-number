import {v4} from 'uuid'
import * as actionTypes from './recordActionTypes'
import {ADD_RECORD, INIT_RECORDS} from './recordActionTypes'
import {Reducer} from 'redux'
import {PayloadAction} from '@reduxjs/toolkit'

interface Record {
	date: string,
	attempts: number,
	guessNumber: number,
	id: string
}

export type RecordState = Record[]

const initState: RecordState = [
	{
		date: new Date().toString(),
		attempts: 1,
		guessNumber: 13,
		id: v4(),
	},
]

// export interface AddRecordAction {
// 	type: typeof ADD_RECORD
// 	payload: Record
// }

export type AddRecordAction = PayloadAction<Record, typeof ADD_RECORD>

export type InitRecordsAction = PayloadAction<{ records: RecordState }, typeof INIT_RECORDS>

type Actions = AddRecordAction | InitRecordsAction

export const recordReducer: Reducer<RecordState, Actions> = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.ADD_RECORD:
			return [...state, {
				date: new Date().toString(),
				id: v4(),
				attempts: action.payload.attempts,
				guessNumber: action.payload.guessNumber,
			}]
		case actionTypes.INIT_RECORDS:
			return [...action.payload.records]
		default:
			return [...state]
	}
}

// export const reducer2 = createReducer(initState, {
// 	[actionTypes.ADD_RECORD]: (state, action: AddRecordAction) => [...state, {
// 		date: new Date().toString(),
// 		id: v4(),
// 		attempts: action.payload.attempts,
// 		guessNumber: action.payload.attempts,
// 	}],
// })