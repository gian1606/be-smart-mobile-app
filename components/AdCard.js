import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function AdCard({ ad }) {
  return (
    <View style={styles.card}>
      {/* Ad image */}
      <Image
        source={ad.image}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Eco partner label overlay */}
      <View style={styles.ecoLabel}>
        <Ionicons name="leaf" size={10} color="#fff" />
        <Text style={styles.ecoText}>Eco Partner</Text>
      </View>

      {/* Bottom info bar */}
      <View style={styles.infoBar}>
        <Text style={styles.partnerName}>{ad.partner}</Text>
        <Text style={styles.tagline}>{ad.tagline}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 260,
    marginLeft: 16,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: colors.secondary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 160,
  },
  ecoLabel: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 9999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ecoText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  infoBar: {
    padding: 12,
    gap: 2,
  },
  partnerName: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  tagline: {
    fontSize: typography.size.xs,
    color: colors.textSecondary,
  },
});
