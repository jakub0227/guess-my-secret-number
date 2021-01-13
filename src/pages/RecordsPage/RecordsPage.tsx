import React, {useContext} from 'react'
import {Route} from '../../types/Route'
import {Card, CardContent, lighten, Typography, useTheme} from '@material-ui/core'
import {WinContext} from '../../App'
import {css} from '@emotion/react'

export const RecordsPage: Route = () => {
	const theme = useTheme()
	const styles = {
		root: css`
          flex-direction: column;
          justify-content: center;
          padding: ${theme.spacing(4)}px;
          border-radius: 30px;
          opacity: 95%;
          width: 450px;
		`,
		scoreCard: css`
          margin-top: ${theme.spacing(3)}px;
          border-radius: 35px;
          background: linear-gradient(135deg, ${theme.palette.primary.main}, ${lighten(theme.palette.secondary.dark, 0.5)} 80%);
          transition: 0.3s;
          z-index: 100;

          :hover {
            box-shadow: 0 16px 70px -12.125px rgba(0, 0, 0, 0.3)
          }
		`,
		cardContent: css`
          padding: ${theme.spacing(3)}px;
          text-align: left;
          opacity: 90%;
		
		`,
	}
	
	const {wins} = useContext(WinContext)
	
	return (
		<div>
			<div css={styles.root}>
				<Typography variant='h5'>
					Score Board:
				</Typography>
				{wins.map(win => (
					<Card css={styles.scoreCard}>
						<CardContent css={styles.cardContent}>
							<Typography>
								Id: {win.id}
							</Typography>
							<Typography>
								Date: {win.date}
							</Typography>
							<Typography>
								Guess number: {win.guessNumber}
							</Typography>
							<Typography>
								Attempts: {win.attempts}
							</Typography>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}

RecordsPage.routeName = '/records'
RecordsPage.displayName = 'Records'
RecordsPage.icon = 'score'