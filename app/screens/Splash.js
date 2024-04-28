import { View, Text, Image, Animated } from "react-native";
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import colors from "../colors/colors";
const Splash = () => {
	const navigation = useNavigation();
	const [fontsLoaded, fontError] = useFonts({
		'Almarai': require('../../assets/fonts/Almarai-Regular.ttf'),
		'Almarai-Bold': require('../../assets/fonts/Almarai-Bold.ttf'),
		'Almarai-Light': require('../../assets/fonts/Almarai-Light.ttf'),
		'Almarai-ExtraBold': require('../../assets/fonts/Almarai-ExtraBold.ttf'),
	});

	if (!fontsLoaded) {
		return null;
	}

	setTimeout(() => {
		navigation.replace('BottomNavigationBar');
	}, 2000);

	const fadeAnim = new Animated.Value(0);
	const pulseAnim = new Animated.Value(1);

	Animated.timing(fadeAnim, {
		toValue: 1,
		duration: 1000,
		delay: 200,
		useNativeDriver: true,
	}).start();

	Animated.loop(
		Animated.sequence([
			Animated.timing(pulseAnim, {
				toValue: 0.8,
				duration: 750,
				useNativeDriver: true,
			}),
			Animated.timing(pulseAnim, {
				toValue: 1,
				duration: 750,
				useNativeDriver: true,
			}),
		])
	).start();


	return (
		<View
			style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}
		>
			<View
				style={{
					width: 150,
					height: 150,
					borderRadius: 75,
					justifyContent: 'center',
					alignItems: 'center',
					marginBottom: 5
				}}
			>
				<Animated.View
					style={{
						opacity: fadeAnim,
						// transform: [
						// 	{
						// 		scale: pulseAnim,
						// 	},
						// ],
						backgroundColor: '#656c9e80',
						position: 'absolute',
						width: 120,
						height: 120,
						borderRadius: 75,

					}}

				></Animated.View>
				<Animated.Image
					style={{
						width: 100,
						height: 100,
						opacity: fadeAnim,
						// backgroundColor: 'red',
						marginBottom: 15,
						transform: [
							{
								scale: fadeAnim.interpolate({
									inputRange: [0, 1],
									outputRange: [0.85, 1],
								}),
							},
						],
					}}
					source={require('../../assets/logo.png')}
					resizeMode="contain"
				/>
			</View>


			<Text style={{ fontFamily: 'Almarai', fontSize: 24 }}>
				مركز المعلومات ودعم اتخاذ القرار
			</Text>

			{/* <Text style={{ fontFamily: 'ReemKufi-Medium', fontSize: 18 }}>
				جاري تحميل التطبيق
			</Text> */}
		</View>
	);
}

export { Splash }

