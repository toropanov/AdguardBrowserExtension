import React, { useState, useRef } from 'react';
import { observer } from 'mobx-react';
import cn from 'classnames';

import { messenger } from '../../../services/messenger';
import { Icon } from '../../../common/components/ui/Icon';
import { addMinDurationTime } from '../../../../common/common-script';
import { MIN_FILTERS_UPDATE_DISPLAY_DURATION } from '../../../common/constants';

import './header.pcss';
import { reactTranslator } from '../../../../common/translators/reactTranslator';

export const Header = observer(() => {
    const [filtersUpdating, setFiltersUpdating] = useState(false);

    const updateFiltersWithMinDuration = addMinDurationTime(
        messenger.updateFilters.bind(messenger),
        MIN_FILTERS_UPDATE_DISPLAY_DURATION,
    );

    const refUpdatingBtn = useRef(null);

    const handleUpdateFiltersClick = async () => {
        refUpdatingBtn.current.blur();
        setFiltersUpdating(true);
        await updateFiltersWithMinDuration();
        setFiltersUpdating(false);
    };

    return (
        <div className="popup-header">
            <div className="popup-header__logo">
                <Icon
                    id="#logo"
                    classname="icon--logo"
                />
            </div>
            <div className="popup-header__buttons">
                <button
                    className={cn(
                        'button',
                        'popup-header__button',
                        { 'updating-filters': filtersUpdating },
                    )}
                    ref={refUpdatingBtn}
                    disabled={filtersUpdating}
                    type="button"
                    onClick={handleUpdateFiltersClick}
                    title={reactTranslator.getMessage('popup_header_update_filters')}
                >
                    <Icon
                        id="#update-filters"
                        classname="icon--update-filters"
                    />
                </button>
            </div>
        </div>
    );
});
