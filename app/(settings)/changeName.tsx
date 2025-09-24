import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const ChangeName = () => {
  return (
    <SafeAreaView className='flex-1 justify-start items-start bg-background px-6'>
      {/* Header */}
      <View className='w-full flex flex-col gap-2'>
        <Text className='text-lg text-foreground font-bold'>Change Username</Text>
        <Text className='text-md text-gray-500'>Your AI tutor will call you by the name you have provided.</Text>
      </View>

      {/* Seperator */}
      <View className='min-h-8'/>

      {/* Actions */}
      <View className='w-full flex flex-col gap-4'>
        <Input placeholder='Enter your name...'/>
        <Button className='w-full justify-center items-center bg-blue-500'>
          <Text className='text-white font-bold'>Save Changes</Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default ChangeName