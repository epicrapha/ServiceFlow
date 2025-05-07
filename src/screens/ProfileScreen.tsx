"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAuth } from "../contexts/AuthContext"
import { COLORS } from "../config/constants"
import { Ionicons } from "@expo/vector-icons"

const ProfileScreen = () => {
  const { user, logout } = useAuth()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [darkModeEnabled, setDarkModeEnabled] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout failed", error)
      Alert.alert("Error", "Failed to log out. Please try again.")
    }
  }

  const confirmLogout = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: handleLogout, style: "destructive" },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Text style={styles.profileInitials}>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </Text>
            </View>
            <TouchableOpacity style={styles.editProfileImageButton}>
              <Ionicons name="camera-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.profileName}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text style={styles.profileRole}>{user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}</Text>

          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Account Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>Account Settings</Text>

          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <Ionicons name="person-outline" size={22} color={COLORS.text} style={styles.settingsItemIcon} />
              <Text style={styles.settingsItemText}>Personal Information</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.text} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <Ionicons name="lock-closed-outline" size={22} color={COLORS.text} style={styles.settingsItemIcon} />
              <Text style={styles.settingsItemText}>Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.text} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <Ionicons name="people-outline" size={22} color={COLORS.text} style={styles.settingsItemIcon} />
              <Text style={styles.settingsItemText}>Teams & Skills</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>Preferences</Text>

          <View style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <Ionicons name="notifications-outline" size={22} color={COLORS.text} style={styles.settingsItemIcon} />
              <Text style={styles.settingsItemText}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#d1d1d1", true: COLORS.primary + "80" }}
              thumbColor={notificationsEnabled ? COLORS.primary : "#f4f3f4"}
            />
          </View>

          <View style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <Ionicons name="moon-outline" size={22} color={COLORS.text} style={styles.settingsItemIcon} />
              <Text style={styles.settingsItemText}>Dark Mode</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: "#d1d1d1", true: COLORS.primary + "80" }}
              thumbColor={darkModeEnabled ? COLORS.primary : "#f4f3f4"}
            />
          </View>

          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <Ionicons name="language-outline" size={22} color={COLORS.text} style={styles.settingsItemIcon} />
              <Text style={styles.settingsItemText}>Language</Text>
            </View>
            <View style={styles.settingsItemRight}>
              <Text style={styles.settingsItemValue}>English</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.text} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Support */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>Support</Text>

          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <Ionicons name="help-circle-outline" size={22} color={COLORS.text} style={styles.settingsItemIcon} />
              <Text style={styles.settingsItemText}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.text} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <Ionicons name="document-text-outline" size={22} color={COLORS.text} style={styles.settingsItemIcon} />
              <Text style={styles.settingsItemText}>Terms & Privacy Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.text} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
              <Ionicons
                name="information-circle-outline"
                size={22}
                color={COLORS.text}
                style={styles.settingsItemIcon}
              />
              <Text style={styles.settingsItemText}>About Service Flow</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
          <Ionicons name="log-out-outline" size={22} color={COLORS.error} style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Service Flow v1.0.0</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: COLORS.card,
    marginBottom: 20,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitials: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
  editProfileImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.secondary,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.card,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 5,
  },
  profileRole: {
    fontSize: 16,
    color: COLORS.text,
    opacity: 0.7,
    marginBottom: 20,
  },
  editProfileButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  editProfileButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  settingsSection: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
  },
  settingsSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 15,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingsItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsItemIcon: {
    marginRight: 15,
  },
  settingsItemText: {
    fontSize: 16,
    color: COLORS.text,
  },
  settingsItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsItemValue: {
    fontSize: 14,
    color: COLORS.text,
    opacity: 0.7,
    marginRight: 5,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffebee",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 12,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.error,
  },
  versionContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  versionText: {
    fontSize: 12,
    color: COLORS.text,
    opacity: 0.5,
  },
})

export default ProfileScreen
