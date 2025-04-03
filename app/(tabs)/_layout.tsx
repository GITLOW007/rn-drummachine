import React from "react";
import { Tabs } from "expo-router";
import Colors from "@/constants/colors";
import { Drum, Save, Settings } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.dark.primary,
        tabBarInactiveTintColor: Colors.dark.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.dark.surface,
          borderTopColor: Colors.dark.border,
        },
        headerStyle: {
          backgroundColor: Colors.dark.surface,
        },
        headerTitleStyle: {
          color: Colors.dark.text,
        },
        headerTintColor: Colors.dark.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Drum Machine",
          tabBarLabel: "Drums",
          tabBarIcon: ({ color }) => <Drum size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved Beats",
          tabBarLabel: "Saved",
          tabBarIcon: ({ color }) => <Save size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}