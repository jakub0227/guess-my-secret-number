import {Difficulty, SetDifficultyAction} from './userConfigReducer'
import {SET_DIFFICULTY} from './userConfigActionTypes'

export const setDifficulty = (difficulty: Difficulty): SetDifficultyAction => ({
	type: SET_DIFFICULTY,
	payload: difficulty,
})