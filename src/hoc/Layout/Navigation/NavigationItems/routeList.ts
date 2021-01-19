import {Route} from '../../../../types/Route'
import {HomePage} from '../../../../pages/HomePage/HomePage'
import {GamePage} from '../../../../pages/GamePage/GamePage'
import {RecordsPage} from '../../../../pages/RecordsPage/RecordsPage'
import {DifficultyDialog} from '../../../../pages/GamePage/EndGameCard/EndGameDialog/DifficultyDialog/DifficultyDialog'

export const routeList: Route[] = [
	HomePage,
	GamePage,
	DifficultyDialog,
	RecordsPage,
]