// Using classes

namespace Index {
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
        export type EventValues = ViewProfileEventProto | ActionEventProto;

        // ...
        interface ProtoInterface {
            readonly value: EventValues;
        }
        export class ViewProfileEvent implements ProtoInterface {
            constructor(public value: ViewProfileEventProto) {}
        }

        export class ActionEvent implements ProtoInterface {
            constructor(public value: ActionEventProto) {}
        }

        export type Event = ViewProfileEvent | ActionEvent;
    }

    // namespace BMA {
    //     interface ProtoMessage {

    //     }
    //     class ViewProfileEvent {
    //         constructor(value: HotpanelProto.ViewProfileEventProto) { }
    //     }
    // }

    namespace HotpanelAPI {
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

                // Actually, I had a compiler warning on the top of the function telling me
                // "Not all code paths return a value."
                // It was not obvious how to fix the problem. After Googling, managed to
                // solve it by returning null here. The error message could have been
                // more helpful.
                return null;
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
    }

    let userId = '123456';

    HotpanelAPI.track(
        new HotpanelProto.ViewProfileEvent({
            encrypted_user_id: userId,
            activation_place: HotpanelProto.ActivationPlaceEnum.ACTIVATION_PLACE_DISCOVER,
        })
    );

    HotpanelAPI.track(
        new HotpanelProto.ActionEvent({
            action_type: HotpanelProto.ActionTypeEnum.ACTION_TYPE_CLICK,
        })
    );
}
