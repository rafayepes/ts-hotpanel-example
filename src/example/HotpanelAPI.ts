import * as HotpanelProto from './HotpanelProto';

type eventsParams = {
    body: HotpanelProto.EventValues;
    name: string;
    ts: number;
};

// How to remove the warning???
let eventToEventName = (event: HotpanelProto.Event) => {
    if (event instanceof HotpanelProto.ViewProfileEvent) {
        return 'EVENT_NAME_VIEW_PROFILE';
    } else if (event instanceof HotpanelProto.ActionEvent) {
        return 'EVENT_NAME_ACTION';
    } else {
        // Note this case should be impossible, but compiler doesn't know
        // Also, there is not exhaustive type checking (adding new type doesn't
        // trigger error)
        console.log('Impossible case');
    }
};

let sendBody = (body: eventsParams) => {
    let sendableBody = JSON.stringify(body);

    console.log(sendableBody);
};

export let track = (event: HotpanelProto.Event) => {
    let eventName = eventToEventName(event);

    if (!eventName) {
        // Note this is required for the compiler, but shouldn't
        // be possible in theory
        return;
    }
    sendBody({
        body: event.value,
        name: eventName,
        ts: Date.now(),
    });
};
