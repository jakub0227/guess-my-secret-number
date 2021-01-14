import React, {FC} from 'react'
import {Button, Card, Fade, Grid, lighten, Typography} from '@material-ui/core'
import {Link} from 'react-router-dom'
import useTheme from '@material-ui/core/styles/useTheme'
import {css} from '@emotion/react'

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
	return (
		
		<Fade in timeout={1000}>
			<Card elevation={5} css={styles.root}>
				<Typography variant='h6'>
					Game Over!
				</Typography>
				<Grid css={styles.gameControl} container spacing={2} alignItems='center'>
					<Grid item xs>
						<Typography variant='h6'>
							Attempts: {props.attempts - 1} / 10
						</Typography>
					</Grid>
					<Grid item xs>
						<Button variant='outlined'
						        component={Link}
						        to='/'
						        onClick={() => props.resetAction()}>
							Try Again?
						</Button>
					</Grid>
				</Grid>
			</Card>
		</Fade>
	
	)
}