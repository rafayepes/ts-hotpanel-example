const enum ActivationPlaceEnum {
    ACTIVATION_PLACE_MY_PROFILE = 1,
    ACTIVATION_PLACE_DISCOVER = 2,
}

const enum ActionTypeEnum {
    ACTION_TYPE_CLICK,
    ACTION_TYPE_CONFIRM,
}

type ViewProfileEvent = {
    encrypted_user_id?: string;
    activation_place?: ActivationPlaceEnum;
};

function trackViewProfileEvent(event: ViewProfileEvent) {
    // ...
}

const userId = getUserId();

trackViewProfileEvent({
    encrypted_user_id: userId,
    activation_place: ActivationPlaceEnum.ACTIVATION_PLACE_DISCOVER,
});

trackViewProfileEvent({
    encrypted_user_id: userId,
});

trackViewProfileEvent({
    encrypted_user_id: userId,
    activation_place: 3, // Sad this actually compiles :__(
});

trackViewProfileEvent({
    encrypted_user_id: userId,
    activation_place: ActionTypeEnum.ACTION_TYPE_CLICK, // Compiler error. Yay!
});

// User ID, strings and numbers
const userId2 = getUserId() + 1; // Compiles =/
const userId3 = getUserId() + ActivationPlaceEnum.ACTIVATION_PLACE_DISCOVER; // Compiles =/; // Compiles =/

function getUserId(): string {
    return '' + Math.floor(Math.random() * 100000);
}
