import React, { useContext } from 'react';
import { observer } from 'mobx-react';

import { reactTranslator } from '../../../../common/translators/reactTranslator';
import { popupStore } from '../../stores/PopupStore';
import { POPUP_STATES } from '../../constants';

import './main.pcss';

export const Main = observer(() => {
    const store = useContext(popupStore);

    const switchersMap = {
        [POPUP_STATES.APPLICATION_ENABLED]: {
            handler: () => {
                store.toggleAllowlisted();
            },
            mode: 'enabled',
        },
        [POPUP_STATES.APPLICATION_FILTERING_DISABLED]: {
            handler: () => {
                store.changeApplicationFilteringDisabled(false);
            },
            mode: 'disabled',
        },
        [POPUP_STATES.APPLICATION_UNAVAILABLE]: {
            mode: 'unavailable',
        },
        [POPUP_STATES.SITE_IN_EXCEPTION]: {
            mode: 'in-exception',
        },
        [POPUP_STATES.SITE_ALLOWLISTED]: {
            handler: () => {
                store.toggleAllowlisted();
            },
            mode: 'allowlisted',
        },
    };

    const switcher = switchersMap[store.popupState];

    return (
        <div className={`main main--${switcher.mode}`}>
            {store.isInitialDataReceived && (
                <>
                    <div className="main__header">
                        {store.showInfoAboutFullVersion && (
                            <div className="main__cta-link">
                                <a
                                    href="https://link.adtidy.org/forward.html?action=compare&from=popup&app=browser_extension"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {reactTranslator.getMessage('popup_header_cta_link')}
                                </a>
                            </div>
                        )}
                        <div className="main__stats">
                            <div className="main__total-blocked-tab">
                                {reactTranslator.getMessage('popup_tab_blocked_count', {
                                    num: store.totalBlockedTab.toLocaleString(),
                                })}
                            </div>
                            <div className="main__total-blocked-all">
                                {reactTranslator.getMessage('popup_tab_blocked_all_count', {
                                    num: store.totalBlocked.toLocaleString(),
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="switcher__info">
                        <div className="current-site">
                            {store.currentSite}
                        </div>
                        <div className="current-status">
                            {store.currentStatusMessage}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
});
