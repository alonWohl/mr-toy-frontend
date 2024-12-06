import * as React from 'react'
import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'

export default function Tags(options) {
	return (
		<Stack spacing={3} sx={{ width: 500 }}>
			<Autocomplete
				multiple
				id="tags-filled"
				options={options}
				defaultValue={''}
				freeSolo
				renderTags={(value, getTagProps) =>
					value.map((option, index) => {
						const { key, ...tagProps } = getTagProps({ index })
						return <Chip variant="outlined" label={option} key={key} {...tagProps} />
					})
				}
				renderInput={params => <TextField {...params} variant="filled" label="labels" placeholder="Favorites" />}
			/>
		</Stack>
	)
}
