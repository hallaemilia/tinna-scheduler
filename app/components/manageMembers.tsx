import React from 'react';
import { Text, View } from '@/components/Themed';
import { Button, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CurrentRouteLogger from './currentRoute';

export default function ManageMembersScreen() {
    const navigation = useNavigation();
    const familyMembers = [
        { id: '1', name: 'John Doe' },
        { id: '2', name: 'Jane Doe' },
    ];

    const renderItem = ({ item }: { item: { id: string, name: string } }) => (
        <View style={styles.item}>
            <Text>{item.name}</Text>
            <Button title="Remove" onPress={() => removeMember(item.id)} />
        </View>
    );

    const removeMember = (_id: string) => {
        // Remove member logic
    };

    return (
        <View style={styles.container}>
            <CurrentRouteLogger/>
            <Text>Manage Members</Text>
            <FlatList
                data={familyMembers}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
            <Button
                title="Invite Member"
                // onPress={() => navigation.navigate('InviteMember')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        padding: 10,
        borderWidth: 1,
        marginVertical: 5,
    },
});
