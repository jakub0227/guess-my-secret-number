import React, {FC} from 'react'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle, lighten, Typography, useTheme,
} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {css} from '@emotion/react'

export const EndGameDialog: FC = () => {
	const theme = useTheme()
	const styles = {
		dialogRoot: css`
          display: flex;
          flex-direction: column;
          align-items: center;
		`,
		content: css`
          flex-direction: column;
          padding: ${theme.spacing(5)}px;
		`,
		buttonWrap: css`
          ${theme.customMixins.flexCentered};
          padding: ${theme.spacing(1.5)}px;
          margin: ${theme.spacing(5)}px;
		`,
		buttons: css`
          min-width: 25%;
          max-width: 50%;
          border-radius: 25px;
          background: linear-gradient(to right, ${lighten(theme.palette.primary.main, 0.1)}, ${lighten(theme.palette.secondary.dark, 0.5)} 80%)
		`,
	}
	
	return (
		<Dialog
			css={styles.dialogRoot}
			open={true}
			keepMounted
		>
			<DialogTitle>
				Dear user !
			</DialogTitle>
			<DialogContent css={styles.content}>
				<DialogContentText color='textPrimary'
				                   variant='h6'
				>
					Thank you for playing our game! From here you can check the High Scores or Change Difficulty by
					increasing or decreasing attempts number. Check details below this text:</DialogContentText>
				<DialogContentText color='textSecondary'
				>
					<Typography component='p'>Easy Mode: 15 attempts</Typography>
					<Typography component='p'>Medium Mode: 10 attempts</Typography>
					<Typography component='p'>Hard Mode: 5 attempts</Typography>
				</DialogContentText>
			</DialogContent>
			<DialogActions css={styles.buttonWrap}>
				<Button variant='contained'
				        css={styles.buttons}
				        color='primary'
				        component={Link}
				        to='/game'>
					Try again?
				</Button>
				<Button variant='contained'
				        css={styles.buttons}
				        color='primary'
				        component={Link}
				        to='/settings'>
					Difficulty Modes
				</Button>
				<Button variant='contained'
				        css={styles.buttons}
				        color='primary'
				        component={Link}
				        to='/records'
				>
					High Scores
				</Button>
			</DialogActions>
		</Dialog>
	)
}