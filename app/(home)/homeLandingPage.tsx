import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { Button } from "@/components/ui/button";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { LinearGradient } from "expo-linear-gradient";
import { extractTextFromFile } from "@/util/textExtractionFromFiles";

const HomeLandingPage = () => {
    const [file, setFile] = useState<any>(null);
    const uploadingStateRef = useRef<null | string>(null);

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

        uploadingStateRef.current = "Uploading...";

        const fileData = result.assets[0];

        const storedFile = {
            uri: fileData.uri,
            name: fileData.name,
            mimeType: fileData.mimeType,
        };

        uploadingStateRef.current = "Extracting data...";

        const res = await extractTextFromFile(storedFile);

        if (!res.success) {
            return;
        };

        uploadingStateRef.current = "Storing data...";

        await AsyncStorage.setItem("tutorKnowledge", JSON.stringify(storedFile));
        setFile(storedFile);

        uploadingStateRef.current = null;
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
        <SafeAreaView className="flex-1 justify-start items-start bg-background px-6 pt-4" edges={["left", "right", "bottom"]}>
            <ScrollView className="w-full" showsVerticalScrollIndicator={false}>

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
                    <View className="w-full flex-row gap-2 items-center justify-center">
                        <TouchableOpacity className="flex-1 max-h-24 items-center justify-center rounded-lg overflow-hidden" onPress={() => Alert.alert("Feature coming soon!")}>
                            <LinearGradient
                                colors={["#3B82F6", "#06B6D4"]} // blue → cyan
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                className="w-full h-full items-center justify-center"
                            >
                                <Text className="text-white text-xl font-bold">Cheat Sheet</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 max-h-24 items-center justify-center rounded-lg overflow-hidden" onPress={() => Alert.alert("Feature coming soon!")}>
                            <LinearGradient
                                colors={["#3B82F6", "#06B6D4"]} // blue → cyan
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                className="w-full h-full items-center justify-center"
                            >
                                <Text className="text-white text-xl font-bold">Flash Cards</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex flex-col w-full gap-4 mb-6">
                    <Text className="text-xl font-bold text-foreground">
                        Start a quiz
                    </Text>
                    <View className="w-full flex-row gap-2 items-center justify-center">
                        <TouchableOpacity className="flex-1 max-h-24 items-center justify-center rounded-lg overflow-hidden" onPress={() => Alert.alert("Feature coming soon!")}>
                            <LinearGradient
                                colors={["#EC4899", "#F97316"]} // pink → orange
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                className="w-full h-full items-center justify-center"
                            >
                                <Text className="text-white text-xl font-bold">Multiple Choice</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 max-h-24 items-center justify-center rounded-lg overflow-hidden" onPress={() => Alert.alert("Feature coming soon!")}>
                            <LinearGradient
                                colors={["#EC4899", "#F97316"]} // pink → orange
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                className="w-full h-full items-center justify-center"
                            >
                                <Text className="text-white text-xl font-bold">True or False</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex flex-col w-full gap-4 mb-6">
                    <Text className="text-xl font-bold text-foreground">
                        Talk to your tutor
                    </Text>
                    <View className="w-full flex-row gap-2 items-center justify-center">
                        <TouchableOpacity className="flex-1 max-h-24 items-center justify-center rounded-lg overflow-hidden" onPress={() => Alert.alert("Feature coming soon!")}>
                            <LinearGradient
                                colors={["#8B5CF6", "#EC4899"]} // violet-500 → pink-500
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                className="w-full h-full items-center justify-center"
                            >
                                <Text className="text-white text-xl font-bold">Start a chat</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex flex-col w-full gap-4 mb-6">
                    <Text className="text-xl font-bold text-foreground">
                        Call to your tutor
                    </Text>
                    <View className="w-full flex-row gap-2 items-center justify-center">
                        <TouchableOpacity className="flex-1 max-h-24 items-center justify-center rounded-lg overflow-hidden" onPress={() => Alert.alert("Feature coming soon!")}>
                            <LinearGradient
                                colors={["#8B5CF6", "#6366F1"]} // violet-500 → indigo-500
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                className="w-full h-full items-center justify-center"
                            >
                                <Text className="text-white text-xl font-bold">Start a Call</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeLandingPage;
