"use client"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useAuth } from "../contexts/AuthContext"
import { SCREENS } from "../config/constants"

// Auth screens
import LoginScreen from "../screens/auth/LoginScreen"
import RegisterScreen from "../screens/auth/RegisterScreen"

// Main app screens
import HomeScreen from "../screens/HomeScreen"
import ProfileScreen from "../screens/ProfileScreen"
import ServicePlanningScreen from "../screens/ServicePlanningScreen"
import VolunteerSchedulingScreen from "../screens/VolunteerSchedulingScreen"
import TeamCommunicationScreen from "../screens/TeamCommunicationScreen"
import RehearsalToolsScreen from "../screens/RehearsalToolsScreen"
import UserManagementScreen from "../screens/UserManagementScreen"
import ReportsScreen from "../screens/ReportsScreen"

// Icons
import { Ionicons } from "@expo/vector-icons"
import { UserRole } from "../types/user"

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
      <Stack.Screen name={SCREENS.REGISTER} component={RegisterScreen} />
    </Stack.Navigator>
  )
}

const MainTabNavigator = () => {
  const { hasRole } = useAuth()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === SCREENS.HOME) {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === SCREENS.SERVICE_PLANNING) {
            iconName = focused ? "calendar" : "calendar-outline"
          } else if (route.name === SCREENS.VOLUNTEER_SCHEDULING) {
            iconName = focused ? "people" : "people-outline"
          } else if (route.name === SCREENS.TEAM_COMMUNICATION) {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline"
          } else if (route.name === SCREENS.REHEARSAL_TOOLS) {
            iconName = focused ? "musical-notes" : "musical-notes-outline"
          } else if (route.name === SCREENS.USER_MANAGEMENT) {
            iconName = focused ? "person-add" : "person-add-outline"
          } else if (route.name === SCREENS.REPORTS) {
            iconName = focused ? "stats-chart" : "stats-chart-outline"
          } else if (route.name === SCREENS.PROFILE) {
            iconName = focused ? "person" : "person-outline"
          }

          return <Ionicons name={iconName as any} size={size} color={color} />
        },
      })}
    >
      <Tab.Screen name={SCREENS.HOME} component={HomeScreen} />
      <Tab.Screen name={SCREENS.SERVICE_PLANNING} component={ServicePlanningScreen} />
      <Tab.Screen name={SCREENS.VOLUNTEER_SCHEDULING} component={VolunteerSchedulingScreen} />
      <Tab.Screen name={SCREENS.TEAM_COMMUNICATION} component={TeamCommunicationScreen} />
      <Tab.Screen name={SCREENS.REHEARSAL_TOOLS} component={RehearsalToolsScreen} />

      {/* Admin-only screens */}
      {hasRole(UserRole.ADMIN) && (
        <>
          <Tab.Screen name={SCREENS.USER_MANAGEMENT} component={UserManagementScreen} />
          <Tab.Screen name={SCREENS.REPORTS} component={ReportsScreen} />
        </>
      )}

      <Tab.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  )
}

const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    // You could return a loading screen here
    return null
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={MainTabNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  )
}

export default RootNavigator
