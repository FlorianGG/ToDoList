import React from 'react';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';

import { APP_COLORS } from '../../styles/color';

const ButtonAddTask = ({ onPressCallback }) => (
  <ActionButton
    buttonColors={APP_COLORS.primaryAction}
    rendericon={<Icon color={APP_COLORS.primaryText} name={'add'} />}
    onPress={() => onPressCallback()}
  />
)

export default ButtonAddTask
