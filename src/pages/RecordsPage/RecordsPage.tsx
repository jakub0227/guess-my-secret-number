import React, {useContext} from 'react'
import {Route} from '../../types/Route'
import {Card, CardContent, CardHeader, Paper, Typography} from '@material-ui/core'
import {WinContext} from '../../App'

export const RecordsPage: Route = (props) => {
	const {wins} = useContext(WinContext)
	
	return (
		<div>
			<Paper>
				<Typography>
					Here we will check our record...
				</Typography>
			</Paper>
			{wins.map(win => (
				
				<Card>
					<CardContent>Id: {win.id}</CardContent>
					<CardContent>Date: {win.date}</CardContent>
					<CardContent>Guess number: {win.guessNumber}</CardContent>
					<CardContent>Attempts: {win.attempts}</CardContent>
				</Card>
			
			))}
		</div>
	)
}

RecordsPage.routeName = '/records'
RecordsPage.displayName = 'Records'
RecordsPage.icon = 'score'