import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default TabBarItem = props => {

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
		outputRange: ['white', '#e4e4f7'],
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
			}}>
			<TouchableOpacity
				{...props}
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
				}}>
				<Animated.View
					style={{
						marginBottom: 5,
						backgroundColor,
						borderRadius: 50,
						paddingHorizontal,
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
