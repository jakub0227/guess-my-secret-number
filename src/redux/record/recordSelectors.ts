import {RecordState} from './recordReducer'
import {RootState} from '../store'

export const recordsSelector = ((state: RootState) => state.record)
