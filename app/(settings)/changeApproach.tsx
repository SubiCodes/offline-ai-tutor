import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Toast, { Toast as ToastFunc } from 'toastify-react-native'

const ChangeApproach = () => {
  return (
    <SafeAreaView className='flex-1 justify-start items-start bg-background px-6'>
      {/* Header */}
      <View className='w-full flex flex-col gap-2'>
        <Text className='text-lg text-foreground font-bold'>Change Approach</Text>
        <Text className='text-md text-gray-500'>Your AI tutor will be taeching you in the manner you've chosen.</Text>
      </View>

      {/* Seperator */}
      <View className='min-h-8' />

      {/* Actions */}
      <View className='w-full flex flex-col gap-4'>

      </View>
      <Toast />
    </SafeAreaView>
  )
}

export default ChangeApproach