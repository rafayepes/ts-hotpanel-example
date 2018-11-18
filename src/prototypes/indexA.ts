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

// More complex types

interface ACCESS_TYPE_LOCATION {
    kind: 'ACCESS_TYPE_LOCATION';
    value: 1;
}

interface ACCESS_TYPE_SELFIE {
    kind: 'ACCESS_TYPE_SELFIE';
    value: 2;
}

type AccessType = ACCESS_TYPE_LOCATION | ACCESS_TYPE_SELFIE;

type AccessEvent = {
    encrypted_user_id: string;
    access_type: AccessType;
};

const AccessTypeEnum = {
    ACCESS_TYPE_LOCATION: {
        kind: 'ACCESS_TYPE_LOCATION',
        value: 1,
    },
    ACCESS_TYPE_SELFIE: {
        kind: 'ACCESS_TYPE_SELFIE',
        value: 2,
    },
};

function trackAccessEvent(event: AccessEvent) {
    // ...
}

trackAccessEvent({
    encrypted_user_id: userId,
    // access_type: AccessTypeEnum.ACCESS_TYPE_LOCATION,
    access_type: {
        kind: 'ACCESS_TYPE_SELFIE',
        value: 2,
    },
});

// trackAccessEvent({
//     encrypted_user_id: userId,
//     activation_place: 3, // Why compiles?
// });

// trackAccessEvent({
//     encrypted_user_id: userId,
//     activation_place: ActionTypeEnum.ACTION_TYPE_CLICK, // Compiler error. Yay!
// });
