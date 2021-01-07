import {css} from '@emotion/react'
import React, {FC} from 'react'
import Paper from '@material-ui/core/Paper'
import useTheme from '@material-ui/core/styles/useTheme'
import {Typography} from '@material-ui/core'

export const Footer: FC = () => {
	const theme = useTheme()
	const styles = {
		root: css`
          width: 100%;
          padding: ${theme.spacing(1.5)}px;
          opacity: 95%;
          z-index: 1;
		`,
		footerText: css`
          font-weight: lighter;
		`,
	}
	
	return (
		<Paper css={styles.root} square elevation={4} component='footer'>
			<Typography css={styles.footerText} variant='subtitle2' align='center'>
				Created with React, Emotion.sh, Material-UI, (C) Copyright {new Date().getFullYear()}
			</Typography>
		</Paper>
	)
}