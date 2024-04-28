import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default TabBarItem = props => {

	const navigation = useNavigation();
	const { item, accessibilityState } = props;

	const focused = accessibilityState.selected;

	const [animation] = useState(new Animated.Value(focused ? 1 : 0));
	useEffect(() => {
		Animated.timing(animation, {
			toValue: focused ? 1 : 0,
			duration: 300,
			useNativeDriver: false,
		}).start();
	}, [focused]);

	const backgroundColor = animation.interpolate({
		inputRange: [0, 1],
		outputRange: ['white', '#656c9e30'],
	});

	const paddingHorizontal = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 20],
	});

	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				height: '100%',
				opacity: item.disabled ? .5 : 1
			}}>
			<TouchableOpacity
				onPress={item.disabled ? () => { } : () => navigation.navigate(item.route)}
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
				}}>
				<Animated.View
					style={{
						marginBottom: 2,
						backgroundColor,
						borderRadius: 50,
						paddingHorizontal,
						paddingVertical: 3,
					}}
				>
					<Icon
						name={focused ? item.iconFocused : item.icon}
						size={24} color="#000" />
				</Animated.View>
				<Text
					numberOfLines={1}
					style={{
						fontSize: 13,
						fontWeight: focused ? '600' : '400',
						color: '#333333',
					}}>
					{item.label}
				</Text>
			</TouchableOpacity>
		</View>
	);
};
