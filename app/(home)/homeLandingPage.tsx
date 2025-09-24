import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from "@expo/vector-icons";

const HomeLandingPage = () => {
    return (
        <SafeAreaView className='flex-1 justify-start items-start bg-background px-6'>
            <ScrollView className='w-full'>

                <View className="flex flex-col w-full gap-4 mb-6">
                    <Text className="text-xl font-bold text-foreground">Uploaded File</Text>

                    <TouchableOpacity
                        onPress={() => { /* Handle file upload */ }}
                        activeOpacity={0.7}
                        className="w-full h-40 border-2 border-dashed border-gray-400 rounded-lg justify-center items-center"
                    >
                        <Ionicons name="add" size={32} color="#6B7280" />
                        <Text className="mt-2 text-gray-500">Tap to upload</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeLandingPage