namespace IndexB {
    namespace HotpanelProto {
        export const enum ActivationPlaceEnum {
            ACTIVATION_PLACE_MY_PROFILE = 1,
            ACTIVATION_PLACE_DISCOVER = 2,
        }

        export const enum ActionTypeEnum {
            ACTION_TYPE_CLICK = 1,
            ACTION_TYPE_CONFIRM = 2,
        }

        // ...
        type ViewProfileEventProto = Readonly<{
            encrypted_user_id?: string;
            activation_place?: ActivationPlaceEnum;
        }>;

        type ActionEventProto = Readonly<{
            action_type?: ActionTypeEnum;
        }>;

        // ...

        type ViewProfileEvent = Readonly<{
            kind: 'ViewProfileEvent';
            value: ViewProfileEventProto;
        }>;

        type ActionEvent = Readonly<{
            kind: 'ActionEvent';
            value: ActionEventProto;
        }>;

        export type EventValues = ViewProfileEventProto | ActionEventProto;
        export type Event = ViewProfileEvent | ActionEvent;
    }

    namespace HotpanelAPI {
        type eventsParams = {
            body: HotpanelProto.EventValues;
            name: string;
            ts: number;
        };

        let eventToEventName = (event: HotpanelProto.Event) => {
            switch (event.kind) {
                case 'ViewProfileEvent': // Lack of IDE support?
                    return 'EVENT_NAME_VIEW_PROFILE';
                case 'ActionEvent':
                    return 'EVENT_NAME_ACTION';
            }
        };

        let sendBody = (body: eventsParams) => {
            let sendableBody = JSON.stringify(body);

            console.log(sendableBody);
        };

        export let track = (event: HotpanelProto.Event) => {
            let eventName = eventToEventName(event);

            sendBody({
                body: event.value,
                name: eventName,
                ts: Date.now(),
            });
        };
    }

    let userId = '123456';

    HotpanelAPI.track({
        kind: 'ViewProfileEvent',
        value: {
            encrypted_user_id: userId,
            activation_place: HotpanelProto.ActivationPlaceEnum.ACTIVATION_PLACE_DISCOVER,
        },
    });

    HotpanelAPI.track({
        kind: 'ActionEvent',
        value: {
            action_type: HotpanelProto.ActionTypeEnum.ACTION_TYPE_CLICK,
        },
    });
}
