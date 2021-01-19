import {createReducer, PayloadAction} from '@reduxjs/toolkit'

import {SET_DIFFICULTY} from './userConfigActionTypes'
//przypomniec typy z TS <> czy type:
export type Difficulty = 'easy' | 'medium' | 'hard'
export const difficulties: Difficulty[] = ['easy', 'medium', 'hard']

export interface UserConfigState {
	difficulty: Difficulty
}

const initState: UserConfigState = {
	difficulty: 'easy',
}
export type SetDifficultyAction = PayloadAction<Difficulty, typeof SET_DIFFICULTY>

export const userConfigReducer = createReducer(initState, {
	[SET_DIFFICULTY]: (state, action: SetDifficultyAction) => ({
		...state,
		difficulty: action.payload,
	}),
})
