import { View, Text, Image, ScrollView, FlatList, TouchableOpacity, LinearGradient, Linking } from "react-native";
import React from "react";
import Octicons from 'react-native-vector-icons/Octicons'; //for the "location" icon 
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const RouteDetails = ({ route }) => {
	const navigation = useNavigation();

	const { routeDetails, companyDetails } = route.params;
	const [contactsCollapsed, setContactsCollapsed] = React.useState(true);

	return (
		<View style={{
			paddingHorizontal: 20,
			flex: 1,
			backgroundColor: "#fff",
		}}>
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				style={{
					borderRadius: 10,
					backgroundColor: "#f6f6f6",
					flexDirection: "column",
					width: 50,
					height: 50,
					alignItems: "center",
					justifyContent: "center",
					position: "absolute",
					top: 50,
					left: 20,
				}}>
				<Octicons name="chevron-left" size={30} color="#000" />
			</TouchableOpacity>

			<View style={{
				marginTop: 30,
				borderRadius: 10,
				flexDirection: "column",
				alignItems: "center"
			}}>
				<Image
					source={{ uri: companyDetails.logo }}
					style={{
						width: 80,
						height: 80,
						borderRadius: 15,
						backgroundColor: '#f5f5f5',
					}} resizeMode="contain" />

				<Octicons name="organization" color="#656c9e"
					size={43}
					style={{ marginVertical: 18, position: 'absolute', }}
				/>
				<View style={{ marginVertical: 10 }}>
					<Text style={{ fontSize: 24, fontFamily: 'Almarai-Bold' }}>{companyDetails.name}</Text>
				</View>
			</View>

			<TouchableOpacity
				onPress={() => setContactsCollapsed(!contactsCollapsed)}
				style={{
					padding: 10,
					marginBottom: 10,
					borderRadius: 10,
					backgroundColor: "#f6f6f6",
					flexDirection: "row-reverse",
					justifyContent: "space-between",
					alignItems: "center",
					width: "100%"
				}}>
				<View style={{
					flexDirection: "row-reverse",
					alignItems: "center",
				}}>
					<AntDesign name="contacts" size={20} color="#000" />
					<View style={{
						marginHorizontal: 10,
					}}>
						<Text style={{ fontSize: 17, fontFamily: 'Almarai-Bold' }}>جهات الاتصال</Text>
					</View>
				</View>
				<Entypo name="chevron-thin-down" size={15} color="#656c9e" style={{
					marginHorizontal: 5,
					transform: [{ rotate: contactsCollapsed ? '0deg' : '-180deg' }]
				}} />
			</TouchableOpacity>

			{!contactsCollapsed && (
				<View style={{
					padding: 10,
					marginBottom: 10,
					borderRadius: 10,
					backgroundColor: "#f6f6f6",
					flexDirection: "column",
					alignItems: "center",
					width: "100%"
				}}>
					{companyDetails.contacts.map((contact, index) => {
						return (
							<View style={{
								flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between", width: "100%", marginVertical: 5,
							}}>
								<Text key={index} style={{ fontSize: 16, fontFamily: 'Almarai-Light' }}>{contact.name} - {contact.phone}</Text>
								<TouchableOpacity style={{
									padding: 5,
									borderRadius: 8,
									backgroundColor: "#fff",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									marginHorizontal: 5
								}}
									onPress={() => {
										Linking.openURL(`tel:${contact.phone}`);
									}}
								>
									<Feather name="phone" size={20} color="#000" />
								</TouchableOpacity>
							</View>
						);
					})}
				</View>
			)}

			{/* route details */}
			<Text style={{
				fontSize: 20,
				fontFamily: 'Almarai-Bold',
				marginBottom: 20,
			}}>
				تفاصيل خط {routeDetails.routeName}
			</Text>
			<FlatList
				style={{
					marginVertical: 10,
				}}
				data={routeDetails.busStops}
				renderItem={({ item, index }) => (
					<View style={{
						flexDirection: "column",
						alignItems: "flex-end",
						width: "100%",
					}}>
						<View style={{
							padding: 10,
							margin: 5,
							borderRadius: 10,
							backgroundColor: "#f6f6f6",
							flexDirection: "row-reverse",
							justifyContent: "space-between",
							alignItems: "center",
						}}>
							<View style={{
								flexDirection: "row-reverse",
								alignItems: "center",
							}}>
								<Octicons name="location" size={20} color="#000" />
								<View style={{
									marginHorizontal: 10,
								}}>
									<Text style={{ fontSize: 14, fontFamily: 'Almarai-Bold' }}>{item.name}</Text>
								</View>
							</View>
						</View>
						{routeDetails.busStops?.length - 1 !== index
							&&
							<MaterialIcons name="keyboard-double-arrow-down" size={30} color="#000" style={{
								marginHorizontal: 30
							}} />
						}
					</View>
				)}
				keyExtractor={item => item.id}
			/>
		</View>
	);
}

export { RouteDetails }

