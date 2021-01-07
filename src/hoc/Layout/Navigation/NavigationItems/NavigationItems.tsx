import React, {FC} from 'react'
import {routeList} from './routeList'
import {NavigationItem} from './NavigationItem/NavigationItem'

export const NavigationItems: FC = () => {
	return (
		<div>
			{routeList.map(({routeName, icon, displayName}) => (
				<NavigationItem key={routeName} icon={icon} name={displayName} link={routeName}/>
			))}
		</div>
	)
}