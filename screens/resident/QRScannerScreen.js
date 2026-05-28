import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import ScanFrame from '../../components/ScanFrame';

export default function QRScannerScreen() {
  const [flashOn, setFlashOn] = useState(false);

  return (
    <View style={styles.screen}>

      {/* Flash toggle */}
      <TouchableOpacity
        style={styles.flashBtn}
        onPress={() => setFlashOn(!flashOn)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={flashOn ? 'flash' : 'flash-off'}
          size={24}
          color={colors.secondary}
        />
      </TouchableOpacity>

      {/* Scan area */}
      <View style={styles.scanArea}>
        <ScanFrame />
        <Text style={styles.instruction}>Align QR code within the frame</Text>
        <Text style={styles.subInstruction}>
          Scan a bin's QR code to earn ECO
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#1A1A1A' },
  flashBtn: {
    position: 'absolute',
    top: 56,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 10,
    borderRadius: 9999,
  },
  scanArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  instruction: {
    color: colors.secondary,
    fontSize: typography.size.base,
    fontWeight: typography.weight.semibold,
    textAlign: 'center',
  },
  subInstruction: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: typography.size.sm,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
