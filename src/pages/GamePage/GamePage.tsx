import React from 'react'
import {Route} from '../../types/Route'
import {Typography} from '@material-ui/core'

export const GamePage: Route = () => {
	return (
		<div>
			<Typography>
				Here we will play...
			</Typography>
		</div>
	)
}

GamePage.routeName = '/game'
GamePage.displayName = 'Game'
GamePage.icon = 'games'