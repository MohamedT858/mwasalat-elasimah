import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons'; //for the "location" icon 
import { useNavigation } from '@react-navigation/native';

export default CompanyCard = props => {

	const { company, index, isSearch } = props;
	const [collapsed, setCollapsed] = useState(true);
	const navigation = useNavigation();

	useEffect(() => {
		setCollapsed(isSearch ? false : true);
	}, [isSearch])



	useEffect(() => {
		if (isSearch) {
			setCollapsed(false);
		}
	}, [isSearch]);

	return (
		<View>
			<TouchableOpacity style={{
				padding: 10,
				marginBottom: 10,
				borderRadius: 10,
				backgroundColor: "#f6f6f6",
				flexDirection: "row-reverse",
				justifyContent: "space-between",
				alignItems: "center",
				width: "100%"
			}}

				onPress={
					() => {
						setCollapsed(!collapsed);
					}
				}
			>
				<View style={{
					flexDirection: "row-reverse",
					alignItems: "center",
				}}>
					<Image source={{ uri: company.logo }} style={{
						width: isSearch ? 40 : 60, height: isSearch ? 40 : 60, backgroundColor: 'white', borderRadius: isSearch ? 15 : 20,
					}} resizeMode="contain" />
					<Octicons name="organization" size={isSearch ? 20 : 30} color="#656c9e"
						style={{ marginHorizontal: isSearch ? 10 : 15, position: 'absolute', }}
					/>
					<View style={{
						marginHorizontal: 10,
					}}>
						<Text style={{ fontSize: 20, fontFamily: 'Almarai-Bold' }}>{company.name}</Text>
						{!isSearch &&
							<View>
								{company.contacts.map((contact, index) => {
									return index < 2 ? (
										<Text key={index} style={{ marginHorizontal: 7, fontSize: 14, fontFamily: 'Almarai-Light' }}>{contact.name} - {contact.phone}</Text>
									) : null;
								})}
								{
									company.contacts.length > 2 ? <Text style={{ marginHorizontal: 7, fontSize: 14, fontFamily: 'Almarai-Light' }}>{' '}و{' '}{company.contacts.length - 2} اخرين</Text> : null
								}</View>}
					</View>
				</View>
				<Entypo name="chevron-thin-down" size={20} color="#656c9e" style={{
					marginHorizontal: 5,
					transform: [{ rotate: collapsed ? '0deg' : '-180deg' }]
				}} />
			</TouchableOpacity>

			{!collapsed && (
				// list of routes which would contain each route name  the first stop and the last stop  and the number of stops 
				<View style={{
					padding: 10,
					marginBottom: 10,
					borderRadius: 10,
					backgroundColor: "#f6f6f6",
					flexDirection: "column",
					justifyContent: "space-between",
					alignItems: "center",
					width: "100%"
				}}>
					{company.busRoutes.map((route, index) => {
						return (
							<View>
								<TouchableOpacity key={index} style={{
									padding: 10,
									marginBottom: 10,
									borderRadius: 10,
									backgroundColor: "#f6f6f6",
									flexDirection: "row-reverse",
									justifyContent: "space-between",
									alignItems: "center",
									width: "100%"
								}}
									onPress={() => {
										navigation.navigate('RouteDetailsScreen', {
											screen: 'RouteDetails',
											params: { routeDetails: route, companyDetails: company }
										});
									}}
								>
									<View style={{
										flexDirection: "row-reverse",
										alignItems: "center",
									}}>
										<Octicons name="location" size={20} color="#656c9e" />
										<View style={{
											marginHorizontal: 10,
										}}>
											<View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
												<Text style={{ fontSize: 18, fontFamily: 'Almarai-Bold' }}>{route.routeName}</Text>
												<Text style={{ fontSize: 14, fontFamily: 'Almarai-Light', marginHorizontal: 10 }}>({route.busStops.length} محطات)</Text>
											</View>
											<Text style={{ fontSize: 14, fontFamily: 'Almarai-Light' }}>{route.busStops[0].name} - {route.busStops[route.busStops?.length - 1].name}</Text>
										</View>
									</View>
									<Entypo name="dots-three-horizontal" size={20} color="#656c9e" />
								</TouchableOpacity>

								{company.busRoutes.length - 1 !== index
									&& <View style={{
										height: 1,
										borderBottomWidth: 2,
										borderBottomColor: "#fff",
										marginHorizontal: 30,
									}} />}
							</View>
						);
					})}
				</View>
			)
			}
		</View>
	);
};
