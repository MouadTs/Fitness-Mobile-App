import {  ScrollView, Platform, KeyboardAvoidingView } from 'react-native'
import React from 'react'

const ios = Platform.OS === 'ios';
export default function CustomKeyboardView({children}) {
  return (
    <KeyboardAvoidingView
        behavior={ios ? 'padding' : 'height'}
        style={{ flex: 1 }}
    >
        <ScrollView
            style={{ flex: 1 }}
            bounces={false}
            showsVerticalScrollIndicators={false}
        >
            {children}
        </ScrollView>
    </KeyboardAvoidingView>
  )
}