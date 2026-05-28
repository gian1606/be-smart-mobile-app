import {
  View, Text, ScrollView, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { typography } from '../../theme/typography';
import { mockCollectorUser, mockCollectorBins } from '../../mock/data';

const C = {
  primary:  '#0D7A5F',
  accent:   '#00E5A0',
  bg:       '#F4FAF7',
  surface:  '#FFFFFF',
  textPri:  '#0D1F1A',
  textSec:  '#6B8C81',
  error:    '#E53535',
  success:  '#00C86A',
  warning:  '#F5A623',
};

const STATUS_CONFIG = {
  full:      { color: C.error,   label: 'Full',      icon: 'alert-circle-outline'      },
  collected: { color: C.success, label: 'Collected', icon: 'checkmark-circle-outline'  },
  missed:    { color: C.warning, label: 'Missed',    icon: 'close-circle-outline'      },
};

export default function CollectorRouteScreen() {
  const fullBins      = mockCollectorBins.filter((b) => b.status === 'full').length;
  const collectedBins = mockCollectorBins.filter((b) => b.status === 'collected').length;
  const totalBins     = mockCollectorBins.length;
  const progress      = Math.round((collectedBins / totalBins) * 100);

  return (
    <View style={styles.screen}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Today's Route</Text>
        <Text style={styles.subtitle}>
          {mockCollectorUser.zone} · {mockCollectorBins.length} stops
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Progress card */}
        <View style={styles.progressCard}>
          <View style={styles.progressTop}>
            <View style={styles.progressLeft}>
              <Text style={styles.progressTitle}>Route Progress</Text>
              <Text style={styles.progressSub}>{collectedBins} of {totalBins} bins collected</Text>
            </View>
            <Text style={styles.progressPct}>{progress}%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
          <View style={styles.progressStats}>
            <View style={styles.progressStat}>
              <View style={[styles.statDot, { backgroundColor: C.error }]} />
              <Text style={styles.progressStatText}>{fullBins} remaining</Text>
            </View>
            <View style={styles.progressStat}>
              <View style={[styles.statDot, { backgroundColor: C.success }]} />
              <Text style={styles.progressStatText}>{collectedBins} collected</Text>
            </View>
          </View>
        </View>

        {/* Stop list */}
        <Text style={styles.sectionLabel}>Stops</Text>
        {mockCollectorBins.map((bin, index) => {
          const cfg = STATUS_CONFIG[bin.status] || STATUS_CONFIG.full;
          return (
            <View key={bin.id} style={styles.stopCard}>
              {/* Step number */}
              <View style={[styles.stepBadge, { backgroundColor: cfg.color }]}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
              </View>

              <View style={styles.stopInfo}>
                <Text style={styles.stopName}>{bin.name} — {bin.street}</Text>
                <Text style={styles.stopBarangay}>{bin.barangay}</Text>
                <Text style={styles.stopReported}>
                  Reported by {bin.reportedBy} · {bin.timeReported}
                </Text>
              </View>

              <View style={[styles.statusPill, { backgroundColor: cfg.color + '22', borderColor: cfg.color }]}>
                <Ionicons name={cfg.icon} size={13} color={cfg.color} />
                <Text style={[styles.statusPillText, { color: cfg.color }]}>{cfg.label}</Text>
              </View>
            </View>
          );
        })}

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  header: {
    backgroundColor: C.primary,
    paddingTop: 56,
    paddingBottom: 18,
    paddingHorizontal: 20,
    gap: 4,
  },
  title:    { fontSize: 24, fontWeight: '700', color: '#fff' },
  subtitle: { fontSize: 13, color: 'rgba(255,255,255,0.7)' },

  content: { padding: 16, gap: 14 },

  // Progress card
  progressCard: {
    backgroundColor: C.surface,
    borderRadius: 14,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E0EDE8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  progressTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  progressLeft: { gap: 2 },
  progressTitle: { fontSize: typography.size.base, fontWeight: typography.weight.bold, color: C.textPri },
  progressSub:   { fontSize: typography.size.xs, color: C.textSec },
  progressPct:   { fontSize: typography.size.xl, fontWeight: typography.weight.bold, color: C.primary },
  progressBarBg: { height: 8, backgroundColor: '#D6EAE0', borderRadius: 9999, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: C.primary, borderRadius: 9999 },
  progressStats: { flexDirection: 'row', gap: 16 },
  progressStat:  { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statDot:       { width: 8, height: 8, borderRadius: 9999 },
  progressStatText: { fontSize: typography.size.xs, color: C.textSec },

  sectionLabel: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.bold,
    color: C.textPri,
    marginTop: 4,
  },

  // Stop card
  stopCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.surface,
    borderRadius: 12,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E0EDE8',
  },
  stepBadge: {
    width: 28,
    height: 28,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  stepNumber: { fontSize: typography.size.xs, fontWeight: typography.weight.bold, color: '#fff' },
  stopInfo:   { flex: 1, gap: 2 },
  stopName:   { fontSize: typography.size.sm, fontWeight: typography.weight.bold, color: C.textPri },
  stopBarangay: { fontSize: typography.size.xs, color: C.textSec },
  stopReported: { fontSize: typography.size.xs, color: '#9BB5AC', marginTop: 1 },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 9999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    flexShrink: 0,
  },
  statusPillText: { fontSize: typography.size.xs, fontWeight: typography.weight.semibold },
});
