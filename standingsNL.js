import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const StandingsNL = () => {
    const [standings, setStandings] = useState([]);

    useEffect(() => {
        const fetchStandings = async () => {
            try {
                const response = await axios.get('https://statsapi.mlb.com/api/v1/standings?leagueId=104');
                const standingsData = response.data.records.flatMap(record =>
                    record.teamRecords.map(teamRecord => ({
                        teamName: teamRecord.team.name,
                        leagueRank: teamRecord.leagueRank,
                        gamesBack: teamRecord.leagueGamesBack
                    }))
                );
                standingsData.sort((a, b) => a.leagueRank - b.leagueRank);
                setStandings(standingsData);
            } catch (error) {
                console.error('Error fetching standings: ', error);
            }
        };

        fetchStandings();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.text}>{item.leagueRank}</Text>
            <Text style={styles.text}>{item.teamName}</Text>
            <Text style={styles.text}>{item.gamesBack}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={standings}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%'
    },
    text: {
        fontSize: 16,
    },
});

export default StandingsNL;
