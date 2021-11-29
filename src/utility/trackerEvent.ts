import noop from 'lodash/noop';

function trackerEvent(event_label: string, event_category: string, initialAction: string) {
    const eventAction = initialAction || 'click';

    const tracker = window.gtag || noop;
    const options = { event_label, event_category };

    tracker('event', eventAction, options);
}

export default trackerEvent;
