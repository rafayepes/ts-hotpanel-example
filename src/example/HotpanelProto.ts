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
