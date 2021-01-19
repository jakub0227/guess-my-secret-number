import {combineReducers} from '@reduxjs/toolkit'
import {createStore} from 'redux'
import {recordReducer, RecordState} from './record/recordReducer'
import {userConfigReducer, UserConfigState} from './userConfig/userConfigReducer'

export interface RootState {
	record: RecordState
	userConfig: UserConfigState
}

export const store = createStore(combineReducers<RootState>({record: recordReducer, userConfig: userConfigReducer}))