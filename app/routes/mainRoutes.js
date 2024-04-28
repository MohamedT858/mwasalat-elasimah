import {
	CompaniesList,
	Home,
	ElectricTrainsList,
	Splash,
	Articles,
	RouteDetails
} from '../screens';
import TabItem from '../components/TabItem';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tabItems = [
	{
		route: 'Home',
		label: 'Home',
		component: Home,
		iconFocused: 'home',
		icon: 'home-outline'
	},
	{
		route: 'CompaniesList',
		label: 'Bus Lines',
		component: CompaniesList,
		iconFocused: 'bus',
		icon: 'bus-outline'
	},
	{
		route: 'ElectricTrainsList',
		label: 'Electric Trains',
		component: ElectricTrainsList,
		iconFocused: 'train',
		icon: 'train-outline',
		disabled: true
	},
	{
		route: 'Articles',
		label: 'Articles',
		component: Articles,
		iconFocused: 'newspaper',
		icon: 'newspaper-outline',
		disabled: true
	}
];


function BottomNavigationBar() {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					paddingHorizontal: 2,
					height: 68,
					backgroundColor: 'white',
					position: 'absolute',
					bottom: 6,
					right: 5,
					left: 5,
					borderRadius: 15,
					shadowColor: '#000',
					shadowOpacity: 0.06,
					shadowOffset: {
						width: 10,
						height: 10,
					},
					elevation: 3,
					borderWidth: 1,
					borderColor: '#656c9e30',
					alignItems: 'space-between',
				},
			}}>
			{tabItems.map((item, index) => {
				return (
					<Tab.Screen
						key={index}
						name={item.route}
						component={item.component}
						options={{
							tabBarShowLabel: false,
							tabBarButton: props => <TabItem {...props} item={item} />,
						}}
					/>
				);
			})}
		</Tab.Navigator>
	);
}

function RouteDetailsScreen() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="RouteDetails"
				component={RouteDetails}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}

export default function TabNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Splash"
				component={Splash}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="BottomNavigationBar"
				component={BottomNavigationBar}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="RouteDetailsScreen"
				component={RouteDetailsScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
