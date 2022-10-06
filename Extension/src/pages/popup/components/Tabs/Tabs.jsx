import React, { useContext } from 'react';
import { observer } from 'mobx-react';

import { Actions } from '../Actions';
import { StatsTable } from '../Stats/StatsTable';
import { VIEW_STATES } from '../../constants';
import { popupStore } from '../../stores/PopupStore';

import './tabs.pcss';

export const Tabs = observer(() => {
    const store = useContext(popupStore);

    const contentMap = {
        [VIEW_STATES.ACTIONS]: Actions,
        [VIEW_STATES.STATS]: StatsTable,
    };

    const TabContent = contentMap[store.viewState];

    return (
        <div className="tabs">
            <div
                className="tabs__content"
                tabIndex={TabContent === contentMap[VIEW_STATES.STATS] ? 0 : -1}
            >
                <TabContent />
            </div>
        </div>
    );
});
