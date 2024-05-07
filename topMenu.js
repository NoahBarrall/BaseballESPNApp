import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import TeamSelector from './teamSelector';
import StandingsAL from './standingsAL';
import StandingsNL from './standingsNL';

const CustomMenu = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [showTeamSelector, setShowTeamSelector] = useState(false);
  const [showStandings, setShowStandings] = useState(null); // Initialize with null, meaning no standings are shown initially

  const handleMenuPress = () => {
    setMenuVisible(true);
  };

  const handleCloseMenu = () => {
    setMenuVisible(false);
  };

  const openTeamSelect = () => {
    setShowTeamSelector(true);
    setMenuVisible(false);
    setShowStandings(null); // Close any standings if opened
  };

  const openStandings = (type) => {
    setShowStandings(type);
    setMenuVisible(false);
    setShowTeamSelector(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleMenuPress}>
        <Text style={styles.menuButton}>Options</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={handleCloseMenu}
      >
        <View style={styles.modalContainer}>
          <View style={styles.menu}>
            <TouchableOpacity onPress={() => openTeamSelect()}>
              <Text style={styles.menuItem}>Team Full Season</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openStandings('AL')}>
              <Text style={styles.menuItem}>AL Standings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openStandings('NL')}>
              <Text style={styles.menuItem}>NL Standings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {showTeamSelector && <TeamSelector />}
      {showStandings === 'AL' && <StandingsAL />}
      {showStandings === 'NL' && <StandingsNL />}
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
