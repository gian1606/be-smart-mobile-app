import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { typography } from '../../theme/typography';
import ScanFrame from '../../components/ScanFrame';

const C = { primary: '#0D7A5F', accent: '#00E5A0' };

export default function CollectorQRScannerScreen({ navigation }) {
  const [flashOn, setFlashOn] = useState(false);

  return (
    <View style={styles.screen}>

      {/* Flash toggle */}
      <TouchableOpacity
        style={styles.flashBtn}
        onPress={() => setFlashOn(!flashOn)}
        activeOpacity={0.7}
      >
        <Ionicons name={flashOn ? 'flash' : 'flash-off'} size={24} color="#fff" />
      </TouchableOpacity>

      {/* Close button */}
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <Ionicons name="close" size={22} color="#fff" />
      </TouchableOpacity>

      {/* Scan area */}
      <View style={styles.scanArea}>
        <ScanFrame />
        <Text style={styles.instruction}>Align QR code within the frame</Text>
        <Text style={styles.subInstruction}>
          Scan the bin's QR code to confirm collection
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#1A1A1A' },
  flashBtn: {
    position: 'absolute', top: 56, right: 20, zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.15)', padding: 10, borderRadius: 9999,
  },
  closeBtn: {
    position: 'absolute', top: 56, left: 20, zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.15)', padding: 10, borderRadius: 9999,
  },
  scanArea: {
    flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20,
  },
  instruction: {
    color: '#fff', fontSize: typography.size.base,
    fontWeight: '600', textAlign: 'center',
  },
  subInstruction: {
    color: 'rgba(255,255,255,0.6)', fontSize: typography.size.sm,
    textAlign: 'center', paddingHorizontal: 40,
  },
});
