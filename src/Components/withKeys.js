import React from 'react';
import { hotkeys } from 'react-keyboard-shortcuts';

const withKeys = (OriginalComp, hotKeys) => {
    class WrapperComp extends React.PureComponent {
        hot_keys = hotKeys;

        render() {
            return <OriginalComp {...this.props} />;
        }
    }

    return hotkeys(WrapperComp);
}

export default withKeys;