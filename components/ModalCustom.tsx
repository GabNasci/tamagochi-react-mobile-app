import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import ButtonYellow, { ButtonColorEnum } from './ButtonYellow';

type ModalCustomType = {
  visible: boolean,
  title: string,
  text: string,
  onClose: () => void,
}

const ModalCustom = ({ visible, title, text, onClose }: ModalCustomType) => {  

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>
            {title}
          </Text>
          <Text style={styles.message}>
            {text}
          </Text>
          <View style={styles.buttonContainerLal}>
            <ButtonYellow
              onPress={onClose}
              buttonColor={ButtonColorEnum.Orange}
              height={40}
              width={147}
              text="Fechar"
              fontSize={20}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#132646',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#303030'
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'supercell-font',
    color: "white",
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'supercell-font',
    color: "white",
  },
  buttonContainerLal: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ModalCustom;
