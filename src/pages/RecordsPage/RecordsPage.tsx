import React from 'react'
import {Route} from '../../types/Route'
import {Typography} from '@material-ui/core'

export const RecordsPage: Route = () => {
	return (
		<div>
			<Typography>
				Here we will check our record...
			</Typography>
		</div>
	)
}

RecordsPage.routeName = '/records'
RecordsPage.displayName = 'Records'
RecordsPage.icon = 'score'