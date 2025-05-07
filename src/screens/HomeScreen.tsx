"use client"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAuth } from "../contexts/AuthContext"
import { COLORS } from "../config/constants"
import { Ionicons } from "@expo/vector-icons"

const HomeScreen = () => {
  const { user } = useAuth()

  // Mock upcoming services data
  const upcomingServices = [
    {
      id: "1",
      title: "Sunday Morning Service",
      date: "2023-06-18",
      time: "10:00 AM",
      role: "Worship Leader",
    },
    {
      id: "2",
      title: "Wednesday Night Worship",
      date: "2023-06-21",
      time: "7:00 PM",
      role: "Vocals",
    },
  ]

  // Mock recent messages data
  const recentMessages = [
    {
      id: "1",
      sender: "Pastor Mike",
      message: "Can you lead worship this Sunday?",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: "2",
      sender: "Tech Team",
      message: "Updated slides for this week",
      time: "1 day ago",
      unread: false,
    },
  ]

  // Mock tasks data
  const tasks = [
    {
      id: "1",
      title: "Confirm availability for Sunday",
      dueDate: "Today",
      completed: false,
    },
    {
      id: "2",
      title: "Review new song charts",
      dueDate: "Tomorrow",
      completed: true,
    },
    {
      id: "3",
      title: "Submit time off request",
      dueDate: "Jun 20",
      completed: false,
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header with greeting */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.firstName}!</Text>
            <Text style={styles.subGreeting}>Welcome to Service Flow</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionButton}>
              <View style={[styles.quickActionIcon, { backgroundColor: "#e3f2fd" }]}>
                <Ionicons name="calendar-outline" size={24} color={COLORS.primary} />
              </View>
              <Text style={styles.quickActionText}>View Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionButton}>
              <View style={[styles.quickActionIcon, { backgroundColor: "#e8f5e9" }]}>
                <Ionicons name="checkmark-circle-outline" size={24} color="#4caf50" />
              </View>
              <Text style={styles.quickActionText}>Confirm Service</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionButton}>
              <View style={[styles.quickActionIcon, { backgroundColor: "#fff3e0" }]}>
                <Ionicons name="musical-notes-outline" size={24} color="#ff9800" />
              </View>
              <Text style={styles.quickActionText}>Rehearsal Files</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickActionButton}>
              <View style={[styles.quickActionIcon, { backgroundColor: "#f3e5f5" }]}>
                <Ionicons name="chatbubbles-outline" size={24} color="#9c27b0" />
              </View>
              <Text style={styles.quickActionText}>Messages</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Services */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Services</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {upcomingServices.length > 0 ? (
            upcomingServices.map((service) => (
              <TouchableOpacity key={service.id} style={styles.serviceCard}>
                <View style={styles.serviceCardLeft}>
                  <Text style={styles.serviceDate}>
                    {new Date(service.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </Text>
                  <Text style={styles.serviceTime}>{service.time}</Text>
                </View>
                <View style={styles.serviceCardRight}>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                  <View style={styles.serviceRoleContainer}>
                    <Text style={styles.serviceRoleLabel}>Your Role:</Text>
                    <Text style={styles.serviceRole}>{service.role}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.text} style={styles.serviceCardIcon} />
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>No upcoming services</Text>
            </View>
          )}
        </View>

        {/* Recent Messages */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Messages</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {recentMessages.length > 0 ? (
            recentMessages.map((message) => (
              <TouchableOpacity key={message.id} style={styles.messageCard}>
                <View style={styles.messageCardContent}>
                  <Text style={styles.messageSender}>{message.sender}</Text>
                  <Text style={styles.messageText} numberOfLines={1}>
                    {message.message}
                  </Text>
                  <Text style={styles.messageTime}>{message.time}</Text>
                </View>
                {message.unread && <View style={styles.unreadIndicator} />}
                <Ionicons name="chevron-forward" size={20} color={COLORS.text} style={styles.messageCardIcon} />
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>No recent messages</Text>
            </View>
          )}
        </View>

        {/* Tasks */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tasks</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TouchableOpacity key={task.id} style={styles.taskCard}>
                <View style={styles.taskCheckbox}>
                  <Ionicons
                    name={task.completed ? "checkmark-circle" : "ellipse-outline"}
                    size={24}
                    color={task.completed ? COLORS.success : COLORS.text}
                  />
                </View>
                <View style={styles.taskContent}>
                  <Text style={[styles.taskTitle, task.completed && styles.taskCompleted]}>{task.title}</Text>
                  <Text style={styles.taskDueDate}>Due: {task.dueDate}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>No tasks</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
  },
  subGreeting: {
    fontSize: 16,
    color: COLORS.text,
    opacity: 0.7,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  quickActionButton: {
    alignItems: "center",
    width: "23%",
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    textAlign: "center",
    color: COLORS.text,
  },
  sectionContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  seeAllText: {
    color: COLORS.primary,
    fontSize: 14,
  },
  serviceCard: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  serviceCardLeft: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    paddingRight: 10,
  },
  serviceDate: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.text,
  },
  serviceTime: {
    fontSize: 12,
    color: COLORS.text,
    opacity: 0.7,
  },
  serviceCardRight: {
    flex: 1,
    paddingLeft: 15,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 5,
  },
  serviceRoleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  serviceRoleLabel: {
    fontSize: 12,
    color: COLORS.text,
    opacity: 0.7,
    marginRight: 5,
  },
  serviceRole: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.primary,
  },
  serviceCardIcon: {
    alignSelf: "center",
  },
  messageCard: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageCardContent: {
    flex: 1,
  },
  messageSender: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 5,
  },
  messageText: {
    fontSize: 14,
    color: COLORS.text,
    opacity: 0.7,
    marginBottom: 5,
  },
  messageTime: {
    fontSize: 12,
    color: COLORS.text,
    opacity: 0.5,
  },
  unreadIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginRight: 10,
    alignSelf: "center",
  },
  messageCardIcon: {
    alignSelf: "center",
  },
  taskCard: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskCheckbox: {
    marginRight: 15,
    justifyContent: "center",
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text,
    marginBottom: 5,
  },
  taskCompleted: {
    textDecorationLine: "line-through",
    opacity: 0.5,
  },
  taskDueDate: {
    fontSize: 12,
    color: COLORS.text,
    opacity: 0.7,
  },
  emptyStateContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.card,
    borderRadius: 12,
  },
  emptyStateText: {
    fontSize: 14,
    color: COLORS.text,
    opacity: 0.5,
  },
})

export default HomeScreen
