import {v4} from 'uuid'
import * as actionTypes from '../actions/actionTypes'

const initState = [
	{
		date: new Date().toString(),
		attempts: 1,
		guessNumber: 13,
		id: v4(),
	},
]

export const reducer = (state = initState, action: any) => {
	switch (action.type) {
		case actionTypes.SET_RECORD_ACTION:
			return [...state, {
				date: new Date().toString(),
				id: v4(),
				attempts: action.payload.attempts,
				guessNumber: action.payload.attempts,
			}]
		default:
			return [...state]
	}
}