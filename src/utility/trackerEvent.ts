import noop from 'lodash/noop';

function trackerEvent(event_label, event_category, initialAction) {
    const eventAction = initialAction || 'click';

    const tracker = window.gtag || noop;
    const options = { event_label, event_category };

    tracker('event', eventAction, options);
}

export default trackerEvent;
