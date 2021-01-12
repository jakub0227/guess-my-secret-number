import React, {createContext, Dispatch, FC, SetStateAction, useState} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {StylesProvider, Typography} from '@material-ui/core'
import {Layout} from './hoc/Layout/Layout'
import {routeList} from './hoc/Layout/Navigation/NavigationItems/routeList'
import {SnackbarProvider} from 'notistack'
import {Theme} from './hoc/Theme/Theme'

export interface Win {
	date: string,
	attempts: number,
	guessNumber: number,
	id: string,
}

interface WinContextProps {
	wins: Win[]
	setWins: Dispatch<SetStateAction<Win[]>>
}

export const WinContext = createContext<WinContextProps>(null as unknown as WinContextProps)

export const App: FC = (props) => {
	const [wins, setWins] = useState<Win[]>([{
		date: new Date().toString(),
		attempts: 5,
		guessNumber: 5,
		id: 'ahsgvdfawb222',
	}])
	
	return (
		<BrowserRouter>
			<StylesProvider injectFirst>
				<SnackbarProvider autoHideDuration={2500}
				                  maxSnack={3}>
					<WinContext.Provider value={{wins, setWins}}>
						<Theme>
							<Layout>
								<Switch>
									<Route>
										{routeList.map(route => (
											<Route exact path={route.routeName} component={route}/>
										))}
									</Route>
									<Route>
										<Typography variant='h1'>
											404 Page Not Found
										</Typography>
									</Route>
								</Switch>
							</Layout>
						</Theme>
					</WinContext.Provider>
				</SnackbarProvider>
			</StylesProvider>
		</BrowserRouter>
	)
}
