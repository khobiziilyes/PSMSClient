import React from 'react';
import { hotkeys } from 'react-keyboard-shortcuts';

const withKeys = (OriginalComp, hotKey, handler, customRefName = 'withRef') => {
    class WrapperComp extends React.PureComponent {
        elementRef = null;

        hot_keys = {
        	[hotKey]: {
        		priority: 1,
        		handler: event => {
        			if (this.elementRef) {
	        			event.preventDefault();
	        			handler({ event, element: this.elementRef });
	        		}
        		}
        	}
        }

        render() {
        	const newProps = {
        		...this.props,
        		[customRefName]: _ => this.elementRef = _
        	}

            return <OriginalComp {...newProps} />;
        }
    }

    return hotkeys(WrapperComp);
}

export default withKeys;