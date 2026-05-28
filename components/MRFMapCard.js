import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function MRFMapCard({ mrfLocations }) {
  return (
    <View style={styles.card}>
      <View style={styles.mapBackground}>

        {/* Grid lines */}
        {[0.2, 0.4, 0.6, 0.8].map((pos) => (
          <View key={`h-${pos}`} style={[styles.gridLineH, { top: `${pos * 100}%` }]} />
        ))}
        {[0.2, 0.4, 0.6, 0.8].map((pos) => (
          <View key={`v-${pos}`} style={[styles.gridLineV, { left: `${pos * 100}%` }]} />
        ))}

        {/* MRF markers */}
        {mrfLocations.map((mrf) => (
          <View
            key={mrf.id}
            style={[styles.markerWrapper, { left: `${mrf.posX * 100}%`, top: `${mrf.posY * 100}%` }]}
          >
            <View style={[styles.iconCircle, { backgroundColor: mrf.status === 'full' ? colors.error : colors.primary }]}>
              <Ionicons name="business" size={14} color="#fff" />
            </View>
            <View style={styles.label}>
              <Text style={styles.labelText} numberOfLines={1}>{mrf.name}</Text>
            </View>
          </View>
        ))}

        {/* Legend — top right */}
        <View style={styles.legend}>
          <View style={styles.legendRow}>
            <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
            <Text style={styles.legendText}>Available</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.legendDot, { backgroundColor: colors.error }]} />
            <Text style={styles.legendText}>Full</Text>
          </View>
        </View>

        {/* Satellite — bottom left */}
        <TouchableOpacity style={styles.satelliteBtn} activeOpacity={0.8}>
          <Text style={styles.satelliteText}>Satellite</Text>
        </TouchableOpacity>

        {/* Zoom — bottom right */}
        <View style={styles.zoomControls}>
          <TouchableOpacity style={styles.zoomBtn} activeOpacity={0.8}>
            <Text style={styles.zoomText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomBtn} activeOpacity={0.8}>
            <Text style={styles.zoomText}>−</Text>
          </TouchableOpacity>
        </View>

      </View>

      <View style={styles.footer}>
        <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
        <Text style={styles.footerText}>Batangas City — MRF Facility Map</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: colors.secondary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  mapBackground: {
    height: 300,
    backgroundColor: '#E8F5E9',
    position: 'relative',
    overflow: 'hidden',
  },
  gridLineH: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: '#C8E6C9' },
  gridLineV: { position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: '#C8E6C9' },

  markerWrapper: {
    position: 'absolute',
    alignItems: 'center',
    width: 80,
    marginLeft: -40,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    marginTop: 4,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    maxWidth: 80,
  },
  labelText: {
    fontSize: 8,
    color: colors.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Legend — top right
  legend: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 8,
    padding: 8,
    gap: 5,
  },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 10, height: 10, borderRadius: 9999 },
  legendText: { fontSize: 10, color: colors.textPrimary, fontWeight: '500' },

  // Satellite — bottom left
  satelliteBtn: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  satelliteText: { fontSize: 12, color: colors.textPrimary, fontWeight: '600' },

  // Zoom — bottom right
  zoomControls: { position: 'absolute', bottom: 10, right: 10, gap: 4 },
  zoomBtn: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomText: { fontSize: 18, color: colors.textPrimary, fontWeight: '600', lineHeight: 22 },

  // Footer
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 10,
    backgroundColor: colors.secondary,
  },
  footerText: { fontSize: typography.size.xs, color: colors.textSecondary },
});
