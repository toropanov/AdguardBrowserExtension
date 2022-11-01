import React from 'react';
import { observer } from 'mobx-react';

import { Icon } from '../../../common/components/ui/Icon';

import './header.pcss';

export const Header = observer(() => {
    return (
        <div className="popup-header">
            <div className="popup-header__logo">
                <Icon
                    id="#logo"
                    classname="icon--logo"
                />
            </div>
        </div>
    );
});
