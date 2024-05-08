import {
	View, Text, Modal, ScrollView, FlatList, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, SafeAreaView
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import companiesList from "../data/busRoutes.json"
import CompanyCard from "../components/CompanyCard";
import AntDesign from 'react-native-vector-icons/AntDesign';

const CompaniesList = () => {
	const [data, setData] = useState(null);

	React.useEffect(() => {
		setData(companiesList);
	}, []);

	const [selectedStops, setSelectedStops] = useState([]);
	const [selectedFilterCompany, setSelectedFilterCompany] = useState(null);
	const [searchItems, setSearchItems] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [focus, setFocus] = useState(false);
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const dropdownRef = useRef(null);
	const [dropdownLayout, setDropdownLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });

	const searchList = (text) => {
		if (text.length > 0) {
			let temp = [];
			companiesList?.transportationCompanies.map((company) => {
				company.busRoutes.map((route) => {
					route.busStops.map((stop) => {
						if (stop.name.includes(text) && !selectedStops.some((item) => item === stop.name) && !temp.some((item) => item === stop.name)) {
							temp.push(stop.name);
						}
					});
				});
			});

			setSearchItems(temp);
		} else {
			setSearchItems([]);
		}
	}

	const updateCompaniesList = () => {
		if (selectedStops.length > 0 ? true : false) {
			let filteredCompanies = [];
			companiesList?.transportationCompanies.forEach((company) => {
				let newCompany = { ...company, busRoutes: [] };
				company.busRoutes.forEach((route) => {
					if (selectedStops.every((selectedStop) =>
						route.busStops.some((stop) => selectedStop === stop.name))) {
						newCompany.busRoutes.push(route);
					}
				});
				if (newCompany.busRoutes.length > 0) {
					filteredCompanies.push(newCompany);
				}
			});

			if (selectedFilterCompany) filteredCompanies = filteredCompanies.filter((company) => company.name === selectedFilterCompany);


			setData({ transportationCompanies: filteredCompanies });
		} else {
			setData(selectedFilterCompany ?
				{ transportationCompanies: companiesList.transportationCompanies.filter((company) => company.name === selectedFilterCompany) }
				: companiesList);
		}
	}

	useEffect(() => {
		updateCompaniesList();
		dropdownRef.current?.measure((x, y, width, height, pageX, pageY) => {
			setDropdownLayout({ x: pageX, y: pageY, width, height });
		});

	}, [selectedStops, selectedFilterCompany]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{
				paddingHorizontal: 20,
				marginBottom: 60,
				flex: 1,
				backgroundColor: "#fff",
			}}>

				{/* Header */}
				<View style={{
					paddingVertical: 10,
					paddingHorizontal: 5,
					borderRadius: 10,
					marginBottom: 10
				}}>
					<Text style={{ fontSize: 20, fontFamily: 'Almarai-Bold' }}>الشركات الخاصة</Text>
				</View>

				{/* SearchBar */}
				<View style={{
					flexDirection: "row-reverse",
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom: 10,
					zIndex: 100,
				}}>

					<View style={{
						flexDirection: "row",
						alignItems: "center",
						backgroundColor: "#f6f6f6",
						borderRadius: 10,
						paddingHorizontal: 10,
						paddingVertical: 5,
						flex: 1,
						marginLeft: 10
					}}>
						<View style={{ flex: 1 }}>
							<ScrollView>
								<TextInput

									placeholder={selectedStops.length > 0 ?
										"ابحث عن محطة اخرى ..."
										: "ابحث عن محطة ..."}
									style={{
										fontSize: 16,
										fontFamily: 'Almarai-Light',
										textAlign: "right",
										flex: 1,
										marginVertical: selectedStops.length > 0 ? 10 : 0
									}}
									onChangeText={(text) => {
										setSearchText(text);
										searchList(text)
									}}
									value={searchText}
									// onBlur={() => setFocus(false)}
									onFocus={() => setFocus(true)}
								/>
								{selectedStops.length > 0 &&
									<View style={{
										flexDirection: "row-reverse",
										flexWrap: "wrap",
										marginTop: 5
									}}>
										{selectedStops.map((stop, index) => {
											return (
												<TouchableOpacity key={index}
													onPress={() => {
														setSelectedStops(selectedStops.filter((item) => item !== stop));
													}}
													style={{
														backgroundColor: "#fff",
														borderRadius: 10,
														paddingHorizontal: 10,
														paddingVertical: 5,
														marginRight: 5,
														marginBottom: 5,
														flexDirection: "row-reverse",
													}}>
													<Text style={{ fontSize: 14, fontFamily: 'Almarai-Light' }}>{stop}</Text>
													<AntDesign name="close" size={14} color="#656c9e" style={{ marginVertical: 5, marginRight: 10 }} />
												</TouchableOpacity>
											);
										})}
									</View>
								}
							</ScrollView>
						</View>

						<AntDesign name="search1" size={24} color="#656c9e" style={{ marginVertical: 5, marginLeft: 10 }} />
					</View>
					<TouchableOpacity style={{
						backgroundColor: "#f6f6f6",
						borderRadius: 10,
						padding: 10,
						alignSelf: "flex-start",
					}}
						onPress={() => {
							updateCompaniesList()
						}}
					>
						<Text style={{ fontSize: 16, fontFamily: 'Almarai-Light' }}>بحث</Text>
					</TouchableOpacity>
					{searchItems.length > 0 && focus &&
						<View
							style={{
								position: "absolute",
								top: 50,
								right: 0,
								left: 0,
								backgroundColor: "#fff",
								borderRadius: 10,
								padding: 10,
								shadowColor: "#000",
								shadowOffset: {
									width: 0,
									height: 2
								},
								shadowOpacity: 0.25,
								shadowRadius: 3.84,
								elevation: 5,
								zIndex: 100,
								maxHeight: 300,
							}}>
							<ScrollView>
								{searchItems.map((result, index) => {
									return (
										<TouchableOpacity key={index} style={{
											flexDirection: "row-reverse",
											alignItems: "center",
											justifyContent: "space-between",
											backgroundColor: "#f6f6f6",
											borderRadius: 10,
											paddingHorizontal: 10,
											paddingVertical: 5,
											marginBottom: index == searchItems.length - 1 ? 0 : 10
										}}
											onPress={() => {
												setSelectedStops([...selectedStops, result]);
												setSearchText("");
												setSearchItems([]);
											}}
										>
											<Text style={{ fontSize: 16, fontFamily: 'Almarai-Light' }}>{result}</Text>
											<AntDesign name="plus" size={18} color="#656c9e" style={{ marginVertical: 5, marginLeft: 10 }} />
										</TouchableOpacity>
									);
								})}
							</ScrollView>
						</View>
					}
				</View>

				<View style={{
					flexDirection: "row-reverse",
					alignItems: "center",
					justifyContent: "space-between",
					marginVertical: 10,
					zIndex: 80,

				}}>
					<Text style={{ fontSize: 16, fontFamily: 'Almarai-Light' }}>
						تصفية حسب الشركة
					</Text>

					<TouchableOpacity style={{
						flexDirection: "row-reverse",
						alignItems: "center",
						justifyContent: "space-between",
						backgroundColor: "#f6f6f6",
						borderRadius: 10,
						paddingHorizontal: 15,
						paddingVertical: 5,
						marginBottom: 10
					}}
						onPress={() => setDropdownVisible(true)}

						ref={dropdownRef}
						onLayout={() => {
							dropdownRef.current.measure((x, y, width, height, pageX, pageY) => {
								setDropdownLayout({ x: pageX, y: pageY, width, height });
							});
						}}
					>
						<Text style={{ fontSize: 16, fontFamily: 'Almarai-Light', marginLeft: 25 }}>
							{selectedFilterCompany ? selectedFilterCompany : "جميع الشركات"}
						</Text>
						<AntDesign name="down" size={18} color="#656c9e" style={{
							marginVertical: 5,
							transform: [{ rotate: !dropdownVisible ? '0deg' : '-180deg' }]
						}} />
					</TouchableOpacity>


					{dropdownLayout && (
						<Modal
							animationType="fade"
							transparent={true}
							visible={dropdownVisible}
							onRequestClose={() => {
								setDropdownVisible(false);
							}}
						>
							<TouchableOpacity
								style={{
									flex: 1,
									justifyContent: 'center',
									alignItems: 'center',
									// backgroundColor: 'rgba(0,0,0,0.5)',
								}}
								onPress={() => setDropdownVisible(false)}
							>
								<View style={{
									position: 'absolute',
									backgroundColor: "#fff",
									minWidth: 160,
									borderRadius: 10,
									padding: 10,
									shadowColor: "#000",
									shadowOffset: {
										width: 0,
										height: 2
									},
									shadowOpacity: 0.25,
									shadowRadius: 3.84,
									elevation: 5,
									zIndex: 100,
									maxHeight: 300,
									top: dropdownLayout.y + dropdownLayout.height - 40,
									left: dropdownLayout.x,
								}}>
									<ScrollView>

										<TouchableOpacity
											style={{
												flexDirection: "row-reverse",
												alignItems: "center",
												justifyContent: "space-between",
												backgroundColor: "#f6f6f6",
												borderRadius: 10,
												paddingHorizontal: 10,
												paddingVertical: 5,
												marginBottom: 10
											}}
											onPress={() => {
												setSelectedFilterCompany(null);
												setDropdownVisible(false);
											}}
										>
											<Text style={{ fontSize: 16, fontFamily: 'Almarai-Light' }}>جميع الشركات</Text>
										</TouchableOpacity>

										{companiesList?.transportationCompanies.map((company, index) => {
											return (
												<TouchableOpacity key={index} style={{
													flexDirection: "row-reverse",
													alignItems: "center",
													justifyContent: "space-between",
													backgroundColor: "#f6f6f6",
													borderRadius: 10,
													paddingHorizontal: 10,
													paddingVertical: 5,
													marginBottom: index == companiesList?.transportationCompanies.length - 1 ? 0 : 10
												}}
													onPress={() => {
														setSelectedFilterCompany(company.name);
														setDropdownVisible(false);
													}}
												>
													<Text style={{ fontSize: 16, fontFamily: 'Almarai-Light' }}>{company.name}</Text>
												</TouchableOpacity>
											);
										})}

									</ScrollView>
								</View>
							</TouchableOpacity>
						</Modal>
					)}
				</View>

				{data?.transportationCompanies.length > 0 ?
					<FlatList data={data?.transportationCompanies}
						renderItem={({ item, index }) => <CompanyCard company={item} index={index} isSearch={selectedStops.length > 0 ? true : false} />}
						keyExtractor={(item, index) => index.toString()}
					/>
					:
					<View style={{
						flex: 1,
						alignItems: "center",
						marginTop: 130
					}}>
						<AntDesign name="frowno" size={50} color="#656c9e" />
						<Text style={{ fontSize: 16, fontFamily: 'Almarai-Light', textAlign: "center", marginTop: 20 }}>لا توجد نتائج</Text>
						<Text style={{ fontSize: 14, fontFamily: 'Almarai-Light', textAlign: "center", marginTop: 10, marginHorizontal: 30 }}>جرب تغيير الشركة اذا كانت محددة او البحث عن محطة اخرى.</Text>
					</View>

				}
			</View>
		</SafeAreaView>
	);
}

export { CompaniesList }

