/**
 * @Author: Lucian Chirca <Zombarian>
 * @Date:   2020-09-29T17:16:53+03:00
 * @Last modified by:   Zombarian
 * @Last modified time: 2020-10-21T18:08:13+03:00
 */

import React, { useEffect, useState } from 'react';
import {
  Platform, Modal,
  TouchableOpacity,
} from 'react-native';
import {
  Block, Text, Button, Icon,
} from 'galio-framework';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../actions';
import theme from '../constants/Theme';

export default function ContentModal() {
  // REDUX
  const state = useSelector((st) => st.main);
  const dispatch = useDispatch();

  // State
  const [modalVisible, changeModalVisible] = useState(false);

  /* Functions */

  const showModal = () => {
    dispatch(actions.setContentModalVisible(false, state.modalContent, state.canCloseModalContent));
    changeModalVisible(true);
  };

  // If there is nothing to display, hide modal
  useEffect(() => {
    // If null
    if (!state.modalContent) {
      changeModalVisible(false);
    }
  }, [state.modalContent]);

  /*
    If the redux state changes, and the modal should be shown,
    check the local variable.
    If it is true, toggle it to force the modal to show.
    If it is false, just make it true
  */
  useEffect(() => {
    if (state.contentModalVisible) {
      if (modalVisible) {
        changeModalVisible(false);
      } else {
        showModal();
      }
    }
  }, [state.contentModalVisible]);

  /*
  If the modal is not shown, but it has to show,
  make the local variable true and turn off the variable that forces
  the modal to show.
*/
  useEffect(() => {
    if (!modalVisible && state.contentModalVisible) {
      showModal();
    }
  }, [modalVisible]);

  const hideModal = () => {
    dispatch(actions.setContentModalVisible(false, null));
    changeModalVisible(false);
  };

  const getCloseModalButton = () => (
    <TouchableOpacity
      onPress={hideModal}
      style={{
        position: 'absolute',
        right: 5,
        top: 5,
      }}
    >
      <Icon
        name="x"
        family="feather"
        size={40}
        style={{
          color: theme.COLORS.DARK_TEXT_COLOR,
        }}
      />
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      presentationStyle={state.canCloseModalContent ? 'pageSheet' : 'fullScreen'}
    >
      {state.modalContent}
      {state.canCloseModalContent && state.modalContent && Platform.OS !== 'ios' && getCloseModalButton()}

    </Modal>
  );
}
