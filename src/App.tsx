import {css} from '@emotion/react'
import React, {FC} from 'react'

export const App: FC = () => {
	return (
		<div css={css`
          background-color: cornflowerblue;
		`}>
			Hello from app !
		</div>
	)
}
