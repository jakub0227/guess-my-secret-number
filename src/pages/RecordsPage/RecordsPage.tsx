import React from 'react'
import {Route} from '../../types/Route'
import {Card, CardContent, lighten, Typography, useTheme} from '@material-ui/core'
import {css} from '@emotion/react'
import {useSelector} from 'react-redux'
import {RecordState} from '../../redux/record/recordReducer'
import {recordsSelector} from '../../redux/record/recordSelectors'

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
	
	const records: RecordState = useSelector(recordsSelector)
	
	return (
		<div>
			<div css={styles.root}>
				<Typography variant='h5'>
					Score Board:
				</Typography>
				{records.map(record => (
					<Card key={record.id} css={styles.scoreCard}>
						<CardContent css={styles.cardContent}>
							<Typography>
								Id: {record.id}
							</Typography>
							<Typography>
								Date: {record.date}
							</Typography>
							<Typography>
								Guess number: {record.guessNumber}
							</Typography>
							<Typography>
								Attempts: {record.attempts}
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