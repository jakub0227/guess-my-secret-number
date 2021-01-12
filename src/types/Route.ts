import {FC} from 'react'
import {IconType} from './IconType'

export interface Route<T = {}> extends FC<T> {
	routeName: string;
	icon: IconType;
	displayName: string;
}
