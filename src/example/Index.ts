import { track as trackHP } from './HotpanelAPI';
import {
    ViewProfileEvent,
    ActivationPlaceEnum,
    ActionEvent,
    ActionTypeEnum,
} from './HotpanelProto';

let userId = '123456';

trackHP(
    new ViewProfileEvent({
        encrypted_user_id: userId,
        activation_place: ActivationPlaceEnum.ACTIVATION_PLACE_DISCOVER,
    })
);

trackHP(
    new ActionEvent({
        action_type: ActionTypeEnum.ACTION_TYPE_CLICK,
    })
);
