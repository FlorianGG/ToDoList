import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';

import { style } from './style';

const MenuTask = () => (
  <Modal
    isVisible={true}
    animationIn={'zoomInDown'}
    animation={'zoomOutUp'}
    animationInTiming={1000}
    animationOutTiming={1000}
    backdropTransitionInTiming={1000}
    backdropTransitionOutTiming={1000}
  >
    <View style={style.modal}>
      <View style={style.textView}>
        <Text>Que souhaitez-vous faire de la tâche ?</Text>
      </View>
      <View style={style.buttonView}>
        <Button
          buttonStyle={style.buttonDelete}
          title="Supprimer"
          onPresse={() => console.log('supprimer')}
        />
        <Button
          buttonStyle={style.buttonChangeStatus}
          title="Changer status"
          onPresse={() => console.log('changer status')}
        />
      </View>
    </View>
  </Modal>
)

export default MenuTask
