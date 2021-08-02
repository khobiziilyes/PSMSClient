import React from 'react';
import { hotkeys } from 'react-keyboard-shortcuts';
import { noSubmit } from '@src/Consts';

const withKeys = (OriginalComp, hotKey, handler, verifyTypying = true, refPropName = 'withRef') => {
    class WrapperComp extends React.PureComponent {
        elementRef = null;

        hot_keys = {
        	[hotKey]: {
        		priority: 1,
        		handler: event =>
                    (verifyTypying ? !noSubmit.includes(event.target.tagName) : true)
                    && this.elementRef
                    && handler({ event, element: this.elementRef })
                    && event.preventDefault()
        	}
        }

        render() {
        	const newProps = {
        		...this.props,
        		[refPropName]: _ => this.elementRef = _
        	}

            return <OriginalComp {...newProps} />;
        }
    }

    return hotkeys(WrapperComp);
}

export default withKeys;