"use client"

import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, ScrollView, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { COLORS } from "../config/constants"
import { type User, UserRole } from "../types/user"

// Mock users data
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    firstName: "Admin",
    lastName: "User",
    role: UserRole.ADMIN,
    teams: ["worship", "tech"],
    skills: ["leadership", "administration"],
    phoneNumber: "555-123-4567",
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    email: "leader@example.com",
    firstName: "Team",
    lastName: "Leader",
    role: UserRole.LEADER,
    teams: ["worship", "tech"],
    skills: ["vocals", "guitar"],
    phoneNumber: "555-234-5678",
    createdAt: "2023-01-02T00:00:00.000Z",
    updatedAt: "2023-01-02T00:00:00.000Z",
  },
  {
    id: "3",
    email: "volunteer@example.com",
    firstName: "Regular",
    lastName: "Volunteer",
    role: UserRole.VOLUNTEER,
    teams: ["worship"],
    skills: ["vocals"],
    phoneNumber: "555-345-6789",
    createdAt: "2023-01-03T00:00:00.000Z",
    updatedAt: "2023-01-03T00:00:00.000Z",
  },
  {
    id: "4",
    email: "jane.doe@example.com",
    firstName: "Jane",
    lastName: "Doe",
    role: UserRole.VOLUNTEER,
    teams: ["tech"],
    skills: ["camera", "lighting"],
    phoneNumber: "555-456-7890",
    createdAt: "2023-01-04T00:00:00.000Z",
    updatedAt: "2023-01-04T00:00:00.000Z",
  },
  {
    id: "5",
    email: "john.smith@example.com",
    firstName: "John",
    lastName: "Smith",
    role: UserRole.LEADER,
    teams: ["production"],
    skills: ["sound", "mixing"],
    phoneNumber: "555-567-8901",
    createdAt: "2023-01-05T00:00:00.000Z",
    updatedAt: "2023-01-05T00:00:00.000Z",
  },
]

const UserManagementScreen = () => {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isAddingUser, setIsAddingUser] = useState(false)
  const [newUser, setNewUser] = useState<Partial<User>>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: UserRole.VOLUNTEER,
  })

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
    const query = searchQuery.toLowerCase()
    return fullName.includes(query) || user.email.toLowerCase().includes(query)
  })

  const handleAddUser = () => {
    setIsAddingUser(true)
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      role: UserRole.VOLUNTEER,
    })
    setModalVisible(true)
  }

  const handleEditUser = (user: User) => {
    setIsAddingUser(false)
    setSelectedUser(user)
    setModalVisible(true)
  }

  const handleDeleteUser = (userId: string) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this user?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          setUsers(users.filter((user) => user.id !== userId))
        },
        style: "destructive",
      },
    ])
  }

  const handleSaveUser = () => {
    if (isAddingUser) {
      // Add new user
      if (!newUser.firstName || !newUser.lastName || !newUser.email) {
        Alert.alert("Error", "Please fill in all required fields")
        return
      }

      const newUserId = Math.random().toString(36).substring(2, 9)
      const userToAdd: User = {
        id: newUserId,
        firstName: newUser.firstName || "",
        lastName: newUser.lastName || "",
        email: newUser.email || "",
        phoneNumber: newUser.phoneNumber,
        role: newUser.role || UserRole.VOLUNTEER,
        teams: [],
        skills: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      setUsers([...users, userToAdd])
    } else if (selectedUser) {
      // Update existing user
      setUsers(users.map((user) => (user.id === selectedUser.id ? { ...user, ...selectedUser } : user)))
    }

    setModalVisible(false)
  }

  const renderUserItem = ({ item }: { item: User }) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <View style={styles.userAvatar}>
          <Text style={styles.userInitials}>
            {item.firstName.charAt(0)}
            {item.lastName.charAt(0)}
          </Text>
        </View>
        <View style={styles.userDetails}>
          <Text style={styles.userName}>
            {item.firstName} {item.lastName}
          </Text>
          <Text style={styles.userEmail}>{item.email}</Text>
          <View style={styles.userRoleContainer}>
            <Text
              style={[
                styles.userRole,
                item.role === UserRole.ADMIN
                  ? styles.adminRole
                  : item.role === UserRole.LEADER
                    ? styles.leaderRole
                    : styles.volunteerRole,
              ]}
            >
              {item.role.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.userActions}>
        <TouchableOpacity style={styles.userActionButton} onPress={() => handleEditUser(item)}>
          <Ionicons name="create-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.userActionButton} onPress={() => handleDeleteUser(item.id)}>
          <Ionicons name="trash-outline" size={20} color={COLORS.error} />
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>User Management</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={COLORS.text} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color={COLORS.text} />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.userList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No users found</Text>
          </View>
        }
      />

      {/* User Edit/Add Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{isAddingUser ? "Add New User" : "Edit User"}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>First Name *</Text>
                <TextInput
                  style={styles.formInput}
                  value={isAddingUser ? newUser.firstName : selectedUser?.firstName}
                  onChangeText={(text) => {
                    if (isAddingUser) {
                      setNewUser({ ...newUser, firstName: text })
                    } else if (selectedUser) {
                      setSelectedUser({ ...selectedUser, firstName: text })
                    }
                  }}
                  placeholder="Enter first name"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Last Name *</Text>
                <TextInput
                  style={styles.formInput}
                  value={isAddingUser ? newUser.lastName : selectedUser?.lastName}
                  onChangeText={(text) => {
                    if (isAddingUser) {
                      setNewUser({ ...newUser, lastName: text })
                    } else if (selectedUser) {
                      setSelectedUser({ ...selectedUser, lastName: text })
                    }
                  }}
                  placeholder="Enter last name"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Email *</Text>
                <TextInput
                  style={styles.formInput}
                  value={isAddingUser ? newUser.email : selectedUser?.email}
                  onChangeText={(text) => {
                    if (isAddingUser) {
                      setNewUser({ ...newUser, email: text })
                    } else if (selectedUser) {
                      setSelectedUser({ ...selectedUser, email: text })
                    }
                  }}
                  placeholder="Enter email address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Phone Number</Text>
                <TextInput
                  style={styles.formInput}
                  value={isAddingUser ? newUser.phoneNumber : selectedUser?.phoneNumber}
                  onChangeText={(text) => {
                    if (isAddingUser) {
                      setNewUser({ ...newUser, phoneNumber: text })
                    } else if (selectedUser) {
                      setSelectedUser({ ...selectedUser, phoneNumber: text })
                    }
                  }}
                  placeholder="Enter phone number"
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Role *</Text>
                <View style={styles.roleButtonsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.roleButton,
                      (isAddingUser ? newUser.role : selectedUser?.role) === UserRole.ADMIN && styles.roleButtonActive,
                    ]}
                    onPress={() => {
                      if (isAddingUser) {
                        setNewUser({ ...newUser, role: UserRole.ADMIN })
                      } else if (selectedUser) {
                        setSelectedUser({ ...selectedUser, role: UserRole.ADMIN })
                      }
                    }}
                  >
                    <Text
                      style={[
                        styles.roleButtonText,
                        (isAddingUser ? newUser.role : selectedUser?.role) === UserRole.ADMIN &&
                          styles.roleButtonTextActive,
                      ]}
                    >
                      Admin
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.roleButton,
                      (isAddingUser ? newUser.role : selectedUser?.role) === UserRole.LEADER && styles.roleButtonActive,
                    ]}
                    onPress={() => {
                      if (isAddingUser) {
                        setNewUser({ ...newUser, role: UserRole.LEADER })
                      } else if (selectedUser) {
                        setSelectedUser({ ...selectedUser, role: UserRole.LEADER })
                      }
                    }}
                  >
                    <Text
                      style={[
                        styles.roleButtonText,
                        (isAddingUser ? newUser.role : selectedUser?.role) === UserRole.LEADER &&
                          styles.roleButtonTextActive,
                      ]}
                    >
                      Leader
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.roleButton,
                      (isAddingUser ? newUser.role : selectedUser?.role) === UserRole.VOLUNTEER &&
                        styles.roleButtonActive,
                    ]}
                    onPress={() => {
                      if (isAddingUser) {
                        setNewUser({ ...newUser, role: UserRole.VOLUNTEER })
                      } else if (selectedUser) {
                        setSelectedUser({ ...selectedUser, role: UserRole.VOLUNTEER })
                      }
                    }}
                  >
                    <Text
                      style={[
                        styles.roleButtonText,
                        (isAddingUser ? newUser.role : selectedUser?.role) === UserRole.VOLUNTEER &&
                          styles.roleButtonTextActive,
                      ]}
                    >
                      Volunteer
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={handleSaveUser}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  addButton: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    margin: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  userList: {
    padding: 15,
  },
  userCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userInfo: {
    flexDirection: "row",
    flex: 1,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  userInitials: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  userDetails: {
    flex: 1,
    justifyContent: "center",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.text,
    opacity: 0.7,
    marginBottom: 4,
  },
  userRoleContainer: {
    flexDirection: "row",
  },
  userRole: {
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: "hidden",
  },
  adminRole: {
    backgroundColor: "#e3f2fd",
    color: "#1976d2",
  },
  leaderRole: {
    backgroundColor: "#e8f5e9",
    color: "#388e3c",
  },
  volunteerRole: {
    backgroundColor: "#fff3e0",
    color: "#f57c00",
  },
  userActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  userActionButton: {
    padding: 8,
    marginLeft: 5,
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.text,
    opacity: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: COLORS.card,
    borderRadius: 10,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  modalContent: {
    padding: 15,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  formGroup: {
    marginBottom: 15,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: COLORS.text,
  },
  formInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  roleButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  roleButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
  },
  roleButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  roleButtonText: {
    fontSize: 14,
    color: COLORS.text,
  },
  roleButtonTextActive: {
    color: "#fff",
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    color: COLORS.text,
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  saveButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
})

export default UserManagementScreen
