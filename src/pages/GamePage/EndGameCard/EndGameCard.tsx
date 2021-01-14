import React, {FC, useState} from 'react'
import {Button, Card, Fade, Grid, lighten, Typography} from '@material-ui/core'
import {Link} from 'react-router-dom'
import useTheme from '@material-ui/core/styles/useTheme'
import {css} from '@emotion/react'
import {EndGameDialog} from './EndGameDialog/EndGameDialog'

type EndGameCardProps = {
	attempts: number;
	resetAction: () => void;
}

export const EndGameCard: FC<EndGameCardProps> = (props) => {
	const theme = useTheme()
	const styles = {
		root: css`
          display: flex;
          flex-direction: column;
          ${theme.customMixins.flexCentered};
          padding: ${theme.spacing(5)}px;
          border-radius: 30px;
          background: linear-gradient(135deg, ${theme.palette.primary.main}, ${lighten(theme.palette.secondary.dark, 0.5)} 80%);
          height: 450px;
          width: 450px;
          max-height: 80vh;
          max-width: 80vh;
          box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.3);
          transition: 0.3s;
          z-index: 100;

          :hover {
            box-shadow: 0 16px 70px -12.125px rgba(0, 0, 0, 0.3)
          }
		`,
		gameControl: css`
          flex-grow: 1;
          margin-top: ${theme.spacing(1)}px
		`,
	}
	const [dialogOpen, setDialogOpen] = useState(false)
	const handleDialogOpen = () => {
		setDialogOpen(true)
	}
	
	return (
		
		<Fade in timeout={1000}>
			<Card elevation={5} css={styles.root}>
				<Typography variant='h5'>
					Game Over!
				</Typography>
				<Grid css={styles.gameControl} container spacing={4} alignItems='center'>
					<Grid item xs>
						<Button variant='outlined'
						        component={Link}
						        to='/'
						        onClick={() => props.resetAction()}>
							Try Again?
						</Button>
					</Grid>
					<Grid item xs>
						<Button onClick={handleDialogOpen} variant='outlined'
						>
							Settings
						</Button>
						{dialogOpen && <EndGameDialog/>}
					</Grid>
				</Grid>
				<Typography variant='h5'>
					Attempts: {props.attempts - 1} / 10
				</Typography>
			</Card>
		</Fade>
	
	)
}