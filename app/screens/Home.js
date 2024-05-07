import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import data from "../data/home.json"
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {

	return (
		<ScrollView style={{
			backgroundColor: "white",
			paddingHorizontal: 10,
			marginBottom: 60,
		}}>

			{/* Header */}
			<View style={{
				marginBottom: 20,
				backgroundColor: "#f5f5f5",
				padding: 15,
				marginBottom: 20,
				borderRadius: 10,
				flexDirection: "row-reverse",
				alignItems: "center"
			}}>
				<Image source={require('../../assets/logo.png')} style={{ width: 60, height: 60 }} resizeMode="contain" />
				<View style={{ marginHorizontal: 10 }}>
					<Text style={{ fontSize: 20, fontFamily: 'Almarai-Bold' }}>{data.header.title}</Text>
					<Text style={{ fontSize: 16, fontFamily: 'Almarai' }}>{data.header.subtitle}</Text>
				</View>
			</View>

			{/* Content Sections */}
			{data.sections.map((section, index) => {
				if (Array.isArray(section.sectionContent)) {
					return (
						<LinearGradient key={index}
							style={{
								paddingBottom: 10,
								marginBottom: 20,
								borderRadius: 10,
								padding: 15,
							}}
							colors={["#e4e4f7", "#f2f2f2", "transparent"]}
							start={{ x: 1, y: 1 }}
							end={{ x: 0, y: 0 }}
						>

							<Text style={{
								fontSize: 18,
								marginBottom: 10,
								fontFamily: 'Almarai-Bold',

							}}>{section.sectionName}</Text>
							{section.sectionContent.map((stage, index) => {
								return (
									<View key={index} style={{
										width: "91%",
										marginBottom: 10,
										borderRightWidth: 2,
										borderRightColor: "#656c9e",
										paddingRight: 10,

									}}>
										<Text style={{ fontSize: 16, fontFamily: 'Almarai-Bold' }}>{stage.stageName}</Text>
										<Text style={{ fontSize: 14, fontFamily: 'Almarai-Light' }}>{stage.subtitle}</Text>
										<Text style={{
											fontSize: 14,
											fontFamily: 'Almarai',
											lineHeight: 23,
										}}>{stage.stageContent}</Text>
									</View>
								);
							})}
						</LinearGradient>
					);
				} else {
					return (
						<View key={index} style={{
							paddingBottom: 10,
							marginBottom: 10,
							borderRadius: 10,
							paddingVertical: 15,
							paddingHorizontal: 5,
						}}>
							<LinearGradient
								colors={["#e4e4f7", "#f2f2f2", "transparent"]}
								start={{ x: 1, y: 1 }}
								end={{ x: 0, y: 0 }}
								style={{
									borderTopRightRadius: 10,
									borderTopLeftRadius: 10,
									padding: 10,
									marginBottom: 10,
								}}
							>
								<Text style={{
									fontSize: 18,
									fontFamily: 'Almarai-Bold',
								}}>{section.sectionName}</Text>
							</LinearGradient>
							<Text style={{
								fontSize: 14,
								fontFamily: 'Almarai',
								lineHeight: 23,
								paddingHorizontal: 10,
							}}>{section.sectionContent}</Text>
						</View>
					);
				}
			})}

		</ScrollView>
	);
}

export { Home }
