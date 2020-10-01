import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Image, Modal, TouchableOpacity,
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
    dispatch(actions.setContentModalVisible(false, state.modalContent));
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

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      {state.modalContent}

    </Modal>
  );
}
