import React from 'react';
import Text from '@Components/Inputs/Text';

export default function Notes() {
	return (
        <Text
            name="notes"
            label="Notes"
            multiline
        />
	);
}