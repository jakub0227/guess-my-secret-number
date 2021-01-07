import React, {FC} from 'react'
import {CssBaseline, Paper, useTheme} from '@material-ui/core'
import {css} from '@emotion/react'
import {Footer} from './Footer/Footer'
import {Navigation} from './Navigation/Navigation'

export const Layout: FC = (props) => {
	const theme = useTheme()
	const styles = {
		root: css`
          min-height: 100vh;
          display: flex;
          flex-direction: column;
		`,
		page: css`
          width: 100%;
          ${theme.customMixins.flexCentered};
          text-align: center;
          flex: 1;
          background: #9796f0; /* fallback for old browsers */
          background: -webkit-linear-gradient(to bottom, #fbc7d4, #9796f0); /* Chrome 10-25, Safari 5.1-6 */
          background: linear-gradient(to bottom, #fbc7d4, #9796f0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		
		`,
	}
	
	return (
		
		<Paper square css={styles.root} elevation={0}>
			<CssBaseline/>
			<Navigation/>
			<Paper square css={styles.page}>
				{props.children}
			</Paper>
			{<Footer/>}
		</Paper>
	
	)
}