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

        type ViewProfileEvent = Readonly<{
            encrypted_user_id?: string;
            activation_place?: ActivationPlaceEnum;
        }>;

        type ActionEvent = Readonly<{
            action_type?: ActionTypeEnum;
        }>;

        export type Event = ViewProfileEvent | ActionEvent;
    }

    namespace HotpanelAPI {
        export let track = (event: HotpanelProto.Event) => {
            // TODO how to identify each different event?
            console.log(JSON.stringify(event));
        };
    }

    let userId = '123456';

    HotpanelAPI.track({
        encrypted_user_id: userId,
        activation_place: HotpanelProto.ActivationPlaceEnum.ACTIVATION_PLACE_DISCOVER,
    });

    HotpanelAPI.track({
        action_type: HotpanelProto.ActionTypeEnum.ACTION_TYPE_CLICK,
    });
}
