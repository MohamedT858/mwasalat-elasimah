import {
	CompaniesList,
	Home,
	ElectricTrainsList,
	Splash,
	Articles
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
		icon: 'home',
		iconFocused: 'home-outline'
	},
	{
		route: 'CompaniesList',
		label: 'Bus Lines',
		component: CompaniesList,
		icon: 'bus',
		iconFocused: 'bus-outline'
	},
	{
		route: 'ElectricTrainsList',
		label: 'Electric Trains',
		component: ElectricTrainsList,
		icon: 'train',
		iconFocused: 'train-outline'
	},
	{
		route: 'Articles',
		label: 'Articles',
		component: Articles,
		icon: 'newspaper',
		iconFocused: 'newspaper-outline'
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
					borderColor: '#e4e4f7',
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
		</Stack.Navigator>
	);
}
