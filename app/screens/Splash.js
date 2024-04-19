import { View, Text } from "react-native";
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
	const navigation = useNavigation();

	setTimeout(() => {
		navigation.replace('BottomNavigationBar');
	}, 3000);

	return (
		<View
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
		>
			<Text
				style={{ fontSize: 20, color: 'blue', textAlign: 'center', padding: 20 }}
			>Splash</Text>
		</View>
	);
}

export { Splash }

