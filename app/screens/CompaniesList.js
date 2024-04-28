import {
	View, Text, Image, ScrollView, FlatList, TouchableOpacity, LinearGradient
} from "react-native";
import React from "react";
import companiesList from "../data/busRoutes.json"
import CompanyCard from "../components/CompanyCard";

// an example of the data json object:
// {
//   "transportationCompanies": [
//     {
//       "id": 1,
//       "name": "ستار لاين",
//       "logo": "https://scontent.fcai19-7.fna.fbcdn.net/v/t39.30808-6/302074551_394334589516872_521561319373952568_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=NMufPI6pNecAX9yNYwz&_nc_ht=scontent.fcai19-7.fna&cb_e2o_trans=q&oh=00_AfAFy-fuLJFH0adqf-2klGE3ZdK-sGRwZ5_OP6dbJ1Z6IQ&oe=660DB9BF",
//       "contacts": [
//         {
//           "id": 1,
//           "name": "أ/ أحمد فايز",
//           "phone": "01022243145"
//         }
//       ],
//       "busRoutes": [
//         {
//           "id": 1,
//           "routeName": "الهرم",
//           "busStops": [
//             {
//               "id": 1,
//               "name": "الطريق الدائري"
//             },
//             {
//               "id": 2,
//               "name": "ط العين السخنة"
//             },
//             {
//               "id": 3,
//               "name": "الدائري الاقليمي"
//             },
//             {
//               "id": 4,
//               "name": "العاصمة"
//             }
//           ]
//         },
//         {
//           "id": 2,
//           "routeName": "6 أكتوبر",
//           "busStops": [
//             {
//               "id": 1,
//               "name": "ميدان الحصري"
//             },
//             {
//               "id": 2,
//               "name": "جهاز ٦ أكتوبر"
//             },
//             {
//               "id": 3,
//               "name": "مجلس أمناء ٦  أكتوبر"
//             },
//             {
//               "id": 4,
//               "name": "فرنيتشر مول"
//             },
//             {
//               "id": 5,
//               "name": "هايبر وان"
//             },
//             {
//               "id": 6,
//               "name": "الدائري"
//             },
//             {
//               "id": 2,
//               "name": "ط العين السخنة"
//             },
//             {
//               "id": 4,
//               "name": "العاصمة"
//             }
//           ]
//         },
//         {
//           "id": 3,
//           "routeName": "الشيخ زايد",
//           "busStops": [
//             {
//               "id": 1,
//               "name": "موقف هايبر"
//             },
//             {
//               "id": 2,
//               "name": "ميدان جهينة"
//             },
//             {
//               "id": 3,
//               "name": "مول مصر"
//             },
//             {
//               "id": 4,
//               "name": "سوق الجملة"
//             },
//             {
//               "id": 5,
//               "name": "جولف دريم"
//             },
//             {
//               "id": 6,
//               "name": "الفردوس"
//             },
//             {
//               "id": 7,
//               "name": "حدائق أكتوبر"
//             },
//             {
//               "id": 8,
//               "name": "المنصورية"
//             },
//             {
//               "id": 9,
//               "name": "الدائري"
//             },
//             {
//               "id": 10,
//               "name": "طريق السويس"
//             },
//             {
//               "id": 11,
//               "name": "الدائري الإقليمي"
//             },
//             {
//               "id": 12,
//               "name": "العاصمة"
//             }
//           ]
//         },
//         {
//           "id": 4,
//           "routeName": "الجيزة",
//           "busStops": [
//             {
//               "id": 1,
//               "name": "ميدان الجيزة"
//             },
//             {
//               "id": 2,
//               "name": "جامعة القاهرة"
//             },
//             {
//               "id": 3,
//               "name": "القصر العيني"
//             },
//             {
//               "id": 4,
//               "name": "مجري العيون"
//             },
//             {
//               "id": 5,
//               "name": "طريق النصر"
//             },
//             {
//               "id": 6,
//               "name": "النادي الاهلي"
//             },
//             {
//               "id": 7,
//               "name": "كيلو ٤.٥"
//             },
//             {
//               "id": 8,
//               "name": "طريق السويس"
//             },
//             {
//               "id": 9,
//               "name": "العاصمة"
//             }
//           ]
//         },
//         {
//           "id": 5,
//           "routeName": "العمرانية",
//           "busStops": [
//             {
//               "id": 1,
//               "name": "نفق الهرم"
//             },
//             {
//               "id": 2,
//               "name": "كوبري الجامعة"
//             },
//             {
//               "id": 3,
//               "name": "القصر العيني"
//             },
//             {
//               "id": 4,
//               "name": "مجري العيون"
//             },
//             {
//               "id": 5,
//               "name": "الدويقة"
//             },
//             {
//               "id": 6,
//               "name": "نادي السكة"
//             },
//             {
//               "id": 7,
//               "name": "طريق السويس"
//             },
//             {
//               "id": 8,
//               "name": "كيلو ٤٠٥"
//             },
//             {
//               "id": 9,
//               "name": "العاصمة"
//             }
//           ]
//         },
//         {
//           "id": 6,
//           "routeName": "الدقي",
//           "busStops": [
//             {
//               "id": 1,
//               "name": "محطة مقار"
//             },
//             {
//               "id": 2,
//               "name": "شارع التحرير"
//             },
//             {
//               "id": 3,
//               "name": "م . عبد المنعم رياض"
//             },
//             {
//               "id": 4,
//               "name": "شارع رمسيس"
//             },
//             {
//               "id": 5,
//               "name": "غمرة"
//             },
//             {
//               "id": 6,
//               "name": "العباسية"
//             },
//             {
//               "id": 7,
//               "name": "امتداد رمسيس"
//             },
//             {
//               "id": 8,
//               "name": "طريق النصر"
//             },
//             {
//               "id": 9,
//               "name": "النادي الاهلي"
//             },
//             {
//               "id": 10,
//               "name": "كيلو ٤٠٥"
//             },
//             {
//               "id": 11,
//               "name": "طريق السويس"
//             },
//             {
//               "id": 12,
//               "name": "العاصمة"
//             }
//           ]
//         },
//         {
//           "id": 7,
//           "routeName": "الزمالك",
//           "busStops": [
//             {
//               "id": 1,
//               "name": "أحمد عرابي"
//             },
//             {
//               "id": 2,
//               "name": "ميدان سفنكس"
//             },
//             {
//               "id": 3,
//               "name": "شارع ٢٦ يوليو"
//             },
//             {
//               "id": 4,
//               "name": "م . عبد المنعم رياض"
//             },
//             {
//               "id": 5,
//               "name": "شارع رمسيس"
//             },
//             {
//               "id": 6,
//               "name": "غمرة"
//             },
//             {
//               "id": 7,
//               "name": "العباسية"
//             },
//             {
//               "id": 8,
//               "name": "امتداد رمسيس"
//             },
//             {
//               "id": 9,
//               "name": "طريق النصر"
//             },
//             {
//               "id": 10,
//               "name": "النادي الاهلي"
//             },
//             {
//               "id": 11,
//               "name": "كيلو ٤٠٥"
//             },
//             {
//               "id": 12,
//               "name": "التسعين الشمالي"
//             },
//             {
//               "id": 13,
//               "name": "الدائري الأوسطي"
//             },
//             {
//               "id": 14,
//               "name": "العاصمة"
//             }
//           ]
//         }
//       ]
//     },
//     {
//       "id": 2,
//       "name": "البريق للنقل",
//       "logo": null,
//       "contacts": [
//         {
//           "id": 1,
//           "name": "أ/إبراهيم محمد",
//           "phone": "0121999978"
//         }
//       ],
//       "busRoutes": [

// 			]
//     }
//   ]
// }


const CompaniesList = () => {
	const [data, setData] = React.useState(null);

	React.useEffect(() => {
		setData(companiesList);
	}, []);

	return (
		<View style={{
			paddingHorizontal: 20,
			paddingTop: 50,
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


			{/* Companies List */}
			<FlatList data={data?.transportationCompanies}
				renderItem={({ item, index }) => <CompanyCard company={item} index={index} />}
				keyExtractor={(item, index) => index.toString()}
			/>
		</View>
	);
}

export { CompaniesList }

