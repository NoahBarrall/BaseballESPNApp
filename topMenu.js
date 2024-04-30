import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import TeamSelector from './teamSelector';

//idea from: https://reactnative.dev/docs/modal

const CustomMenu = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [showTeamSelector, setShowTeamSelector] = useState(false);

  const handleMenuPress = () => {
    setMenuVisible(true);
  };

  const handleCloseMenu = () => {
    setMenuVisible(false);
  };

  const openTeamSelect = () => {
    setShowTeamSelector(true);
    setMenuVisible(false); // Close the menu after clicking "Team Full Season"
  };

  return (
    <View>
      <TouchableOpacity onPress={handleMenuPress}>
        <Text style={styles.menuButton}>Menu</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={handleCloseMenu}
      >
        <View style={styles.modalContainer}>
          <View style={styles.menu}>
            <TouchableOpacity onPress={openTeamSelect}>
              <Text style={styles.menuItem}>Team Full Season</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCloseMenu}>
              <Text style={styles.menuItem}>Standings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Render TeamSelector if showTeamSelector is true */}
      {showTeamSelector && <TeamSelector />}
    </View>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menu: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  menuItem: {
    fontSize: 16,
    padding: 10,
  },
});

export default CustomMenu;
