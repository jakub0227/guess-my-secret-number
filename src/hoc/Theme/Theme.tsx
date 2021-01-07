import React, {FC} from 'react'
import {createMuiTheme, ThemeProvider} from '@material-ui/core'
import {css, SerializedStyles} from '@emotion/react'

declare module '@material-ui/core/styles/createMuiTheme' {
	interface Theme {
		customMixins: {
			flexCentered: SerializedStyles;
		};
	}
	
	interface ThemeOptions extends Theme {
	}
}
export const Theme: FC = (props) => {
	
	return (
		<ThemeProvider
			theme={createMuiTheme({
				palette: {
					type: 'dark',
					primary: {
						light: '#b085f5',
						main: '#7e57c2',
						dark: '#4d2c91',
						contrastText: '#ffffff',
					},
					secondary: {
						light: '#fff350',
						main: '#ffc107',
						dark: '#c79100',
						contrastText: '#000000',
					},
				},
				props: {
					MuiAppBar: {
						variant: 'elevation',
						elevation: 5,
					},
					MuiTypography: {
						gutterBottom: true,
						color: 'textPrimary',
					},
				},
				customMixins: {
					flexCentered: css`
                      display: flex;
                      justify-content: center;
                      align-items: center;
					`,
				},
			})}
		>
			{props.children}
		</ThemeProvider>
	)
}
