import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

export default function Icon() {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 40/2, marginLeft: 15}}>
        <Ionicons name='md-musical-note' size={48} color='#ffff' />
      </TouchableOpacity>
    </View>
  );
}
