import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { Button } from "@/components/ui/button";
import EvilIcons from '@expo/vector-icons/EvilIcons';

const HomeLandingPage = () => {
    const [file, setFile] = useState<any>(null);

    const getCurrentFile = async () => {
        const stored = await AsyncStorage.getItem("tutorKnowledge");
        if (stored) {
            setFile(JSON.parse(stored));
        }
    };

    const pickFile = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: [
                "text/plain",
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ],
            copyToCacheDirectory: true,
        });

        if (result.canceled) return;

        const fileData = result.assets[0];

        const storedFile = {
            uri: fileData.uri,
            name: fileData.name,
            mimeType: fileData.mimeType,
        };

        await AsyncStorage.setItem("tutorKnowledge", JSON.stringify(storedFile));
        setFile(storedFile);
    };

    const clearFile = async () => {
        try {
            await AsyncStorage.removeItem("tutorKnowledge");
            setFile(null);
        } catch (err) {
            console.error("Error removing file:", err);
        }
    };

    const removeFile = () => {
        Alert.alert("Remove File", "Delete this file?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: clearFile },
        ]);
    };

    useFocusEffect(
        useCallback(() => {
            getCurrentFile();
        }, [])
    );

    return (
        <SafeAreaView className="flex-1 justify-start items-start bg-background px-6">
            <ScrollView className="w-full">

                {/* UPLOAD FILE */}
                <View className="flex flex-col w-full gap-4 mb-6">
                    <Text className="text-xl font-bold text-foreground">
                        Uploaded File
                    </Text>

                    {file ? (
                        <View className="w-full flex-col gap-2">
                            <View className="w-full p-4 border rounded-lg border-gray-300 bg-gray-50 flex-col items-center justify-between">
                                <View className="flex-row items-center justify-between flex-1">
                                    {/* Left side: icon + truncated filename */}
                                    <View className="flex-row items-center flex-1 mr-2">
                                        <Ionicons name="document-text-outline" size={28} color="#3B82F6" />
                                        <Text
                                            className="ml-2 text-gray-800 flex-1"
                                            numberOfLines={1}
                                            ellipsizeMode="middle"
                                        >
                                            {file.name}
                                        </Text>
                                    </View>

                                    {/* Trash button */}
                                    <TouchableOpacity onPress={() => { removeFile() }}>
                                        <EvilIcons name="trash" size={28} color="red" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Button onPress={pickFile} className="bg-blue-500 w-full justify-center gap-2">
                                <Text className="text-base font bold text-white">Upload new file</Text>
                            </Button>
                        </View>
                    ) : (
                        <TouchableOpacity
                            onPress={pickFile}
                            activeOpacity={0.7}
                            className="w-full h-40 border-2 border-dashed border-gray-400 rounded-lg justify-center items-center"
                        >
                            <Ionicons name="add" size={32} color="#6B7280" />
                            <Text className="mt-2 text-gray-500">Tap to upload</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View className="flex flex-col w-full gap-4 mb-6">
                    <Text className="text-xl font-bold text-foreground">
                        Create notes from file
                    </Text>
                    <View className="w-full flex-row gap-2">

                    </View>
                </View>



            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeLandingPage;
