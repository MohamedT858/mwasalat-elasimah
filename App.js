import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './app/routes/mainRoutes';
import React from 'react';

export default function App() {
	return (
		// <Provider store={store}>
		<NavigationContainer>
			<TabNavigator />
		</NavigationContainer>
		// </Provider>
	);
}

