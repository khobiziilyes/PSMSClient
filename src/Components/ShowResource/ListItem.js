import React from 'react';
import {
	ListItem as MuiListItem,
	ListItemAvatar,
	Avatar,
	ListItemText
} from '@material-ui/core';

export default function ListItem( { children, primary, secondary, after = false, ...props } ) {
	return (
		<MuiListItem {...props}>
			{!after && <ListItemAvatar>
					<Avatar>
						{children}
					</Avatar>
				</ListItemAvatar>
			}
			
			<ListItemText
				primary={primary}
				secondary={secondary}
			/>

			{after && <ListItemAvatar>
					<Avatar>
						{children}
					</Avatar>
				</ListItemAvatar>
			}
		</MuiListItem>
	);
}