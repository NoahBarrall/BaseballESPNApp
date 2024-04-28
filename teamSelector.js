import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button } from 'react-native';
import axios from 'axios';
import { Link, createBrowserRouter, RouterProvider, BrowserRouter } from 'react-router-dom';

const TeamSelector = () => {
  const [teamName, setTeamName] = useState('');
  const [teamId, setTeamId] = useState('');
  const [allGames, setAllGames] = useState([]);
  const [searched, setSearched] = useState(false);

  const fetchAllGames = async () => {
    try {
      if (!teamId) return;
      const response = await axios.get(`https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&teamId=${teamId}&startDate=2024-03-28&endDate=2024-04-27`);
      setAllGames(response.data.dates);
    } catch (error) {
      console.error('Error fetching all games: ', error);
    }
  };

  useEffect(() => {
    if (searched) {
      fetchAllGames();
    }
  }, [teamId, searched]);

  const handleSearch = () => {
    setSearched(true);
  };

  const teamNametoId = {
    'Angels': '108',
    'Diamondbacks': '109',
    'Orioles': '110',
    'Red Sox': '111',
    'Cubs': '112',
    'Reds': '113',
    'Indians': '114',
    'Guardians': '114',
    'Rockies': '115',
    'Tigers': '116',
    'Astros': '117',
    'Royals': '118',
    'Dodgers': '119',
    'Nationals': '120',
    'Mets': '121',
    'Athletics': '133',
    'Pirates': '134',
    'Padres': '135',
    'Mariners': '136',
    'Giants': '137',
    'Cardinals': '138',
    'Rays': '139',
    'Rangers': '140',
    'Blue Jays': '141',
    'Twins': '142',
    'Phillies': '143',
    'Braves': '144',
    'White Sox': '145',
    'Marlins': '146',
    'Yankees': '147',
    'Brewers': '158'
  };

  const convertTeamNametoId = (inputName) => {
    return teamNametoId[inputName] || '';
  };

  return (
    <View>
      <TextInput
        placeholder="Enter Team Name"
        onChangeText={(text) => {
          setTeamName(text);
          setTeamId(convertTeamNametoId(text));
        }}
        value={teamName}
        style={{ borderWidth: 1, padding: 8, marginVertical: 8 }}
      />
      <Text>MLB Games</Text>
      <Button title="Search" onPress={handleSearch}/>
      {searched && (
        <FlatList
          data={allGames}
          keyExtractor={item => item.date}
          renderItem={({ item }) => (
            <View>
              <Text>Date: {item.date}</Text>
              <Text>Games:</Text>
              <FlatList
                data={item.games}
                keyExtractor={game => game.gamePk.toString()}
                renderItem={({ item: game }) => (
                  <View>
                    <Text>{game.teams.away.team.name} {game.teams.away.score} vs {game.teams.home.team.name} {game.teams.home.score}</Text>
                  </View>
                )}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default TeamSelector;
