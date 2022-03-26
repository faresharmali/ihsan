import React, { Component } from 'react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: '#348578' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 18,
          fontWeight:"500"
        }}
        text2Style={{
          fontSize: 16,
        }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17
        }}
        text2Style={{
          fontSize: 15
        }}
      />
    ),
  };
  export default toastConfig