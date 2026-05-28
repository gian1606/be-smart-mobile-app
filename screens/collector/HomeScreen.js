import { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors'; // eslint-disable-line no-unused-vars
import { typography } from '../../theme/typography';
import {
  mockCollectorUser,
  mockCollectorBins,
  mockCollectorNotifications,
  mockPartnerAds,
} from '../../mock/data';
import NotificationsModal from '../../components/NotificationsModal';
import AdCard from '../../components/AdCard';

const C = {
  primary:   '#0D7A5F',
  primaryLt: '#1A9E7A',
  primaryDk: '#095C47',
  accent:    '#00E5A0',
  bg:        '#F4FAF7',
  surface:   '#FFFFFF',
  textPri:   '#0D1F1A',
  textSec:   '#6B8C81',
  error:     '#E53535',
  success:   '#00C86A',
  warning:   '#F5A623',
};

function CollectorMapView({ bins }) {
  const statusColor = (s) => {
    if (s === 'full')      return C.error;
    if (s === 'collected') return C.success;
    return C.warning;
  };

  return (
    <View style={mapStyles.container}>
      <View style={mapStyles.routeLine} />

      {/* Truck marker */}
      <View
        style={[
          mapStyles.markerWrapper,
          {
            left: `${mockCollectorUser.truck.posX * 100}%`,
            top:  `${mockCollectorUser.truck.posY * 100}%`,
          },
        ]}
      >
        <View style={[mapStyles.iconCircle, { backgroundColor: '#F57C00', width: 34, height: 34 }]}>
          <Ionicons name="bus" size={16} color="#fff" />
        </View>
        <View style={mapStyles.label}>
          <Text style={mapStyles.labelText} numberOfLines={1}>{mockCollectorUser.truck.label}</Text>
        </View>
      </View>

      {/* Bin markers */}
      {bins.map((bin) => (
        <View
          key={bin.id}
          style={[
            mapStyles.markerWrapper,
            {
              left: `${bin.posX * 100}%`,
              top:  `${bin.posY * 100}%`,
            },
          ]}
        >
          <View style={[mapStyles.iconCircle, { backgroundColor: statusColor(bin.status) }]}>
            <Ionicons name="trash-outline" size={13} color="#fff" />
          </View>
          <View style={mapStyles.label}>
            <Text style={mapStyles.labelText} numberOfLines={1}>{bin.name}</Text>
          </View>
        </View>
      ))}

      {/* Legend — top right */}
      <View style={mapStyles.legend}>
        {[
          { color: C.error,   label: 'Full'       },
          { color: C.success, label: 'Collected'  },
          { color: C.warning, label: 'Missed'     },
        ].map((item) => (
          <View key={item.label} style={mapStyles.legendRow}>
            <View style={[mapStyles.legendDot, { backgroundColor: item.color }]} />
            <Text style={mapStyles.legendText}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* Satellite — bottom left */}
      <TouchableOpacity style={mapStyles.satelliteBtn} activeOpacity={0.8}>
        <Text style={mapStyles.satelliteText}>Satellite</Text>
      </TouchableOpacity>

      {/* Zoom — bottom right */}
      <View style={mapStyles.zoomControls}>
        <TouchableOpacity style={mapStyles.zoomBtn} activeOpacity={0.8}>
          <Text style={mapStyles.zoomText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={mapStyles.zoomBtn} activeOpacity={0.8}>
          <Text style={mapStyles.zoomText}>−</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function CollectorHomeScreen({ navigation }) {
  const [notifVisible, setNotifVisible] = useState(false);

  const fullBins      = mockCollectorBins.filter((b) => b.status === 'full').length;
  const collectedBins = mockCollectorBins.filter((b) => b.status === 'collected').length;
  const totalBins     = mockCollectorBins.length;
  const unreadCount   = mockCollectorNotifications.filter((n) => !n.read).length;

  return (
    <View style={styles.screen}>

      {/* ── Teal Header — bell only, no avatar ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerCaption}>Today's Route</Text>
          <Text style={styles.headerName}>
            {mockCollectorUser.name} · {mockCollectorUser.collectorId.split('-').pop()}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.bellBtn}
          onPress={() => setNotifVisible(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="notifications-outline" size={24} color="#fff" />
          {unreadCount > 0 && (
            <View style={styles.bellBadge}>
              <Text style={styles.bellBadgeText}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Map ── */}
        <CollectorMapView bins={mockCollectorBins} />

        {/* ── Route Banner ── */}
        <View style={styles.routeBanner}>
          <Ionicons name="navigate-outline" size={20} color={C.primary} />
          <View style={styles.routeInfo}>
            <Text style={styles.routeTitle}>Optimized Route Active</Text>
            <Text style={styles.routeSub}>
              {fullBins} bins to collect · Est. {fullBins * 15} mins
            </Text>
          </View>
          <TouchableOpacity style={styles.goBtn} activeOpacity={0.8}>
            <Text style={styles.goBtnText}>GO</Text>
          </TouchableOpacity>
        </View>

        {/* ── Progress strip ── */}
        <View style={styles.progressCard}>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Route Progress</Text>
            <Text style={styles.progressCount}>{collectedBins}/{totalBins} bins</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${(collectedBins / totalBins) * 100}%` }]} />
          </View>
        </View>

        {/* ── Check this out ── */}
        <Text style={styles.sectionLabel}>Check this out</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.adScroll} contentContainerStyle={{ paddingRight: 16 }}>
          {mockPartnerAds.map((ad, index) => (
            <AdCard key={ad.id} ad={ad} index={index} />
          ))}
        </ScrollView>

        <View style={{ height: 30 }} />
      </ScrollView>

      <NotificationsModal
        visible={notifVisible}
        onClose={() => setNotifVisible(false)}
        notifications={mockCollectorNotifications}
        accentColor="#0D7A5F"
      />
    </View>
  );
}

// ─── Map styles ───────────────────────────────────────────────────────────────
const mapStyles = StyleSheet.create({
  container: {
    height: 300,
    backgroundColor: '#D6EAE0',
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#B2D8C8',
  },
  routeLine: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    height: 2,
    backgroundColor: C.primary,
    opacity: 0.6,
  },
  markerWrapper: {
    position: 'absolute',
    alignItems: 'center',
    width: 64,
    marginLeft: -32,
  },
  iconCircle: {
    width: 30,
    height: 30,
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
    paddingHorizontal: 4,
    paddingVertical: 2,
    maxWidth: 64,
  },
  labelText: {
    fontSize: 7,
    color: C.textPri,
    fontWeight: '600',
    textAlign: 'center',
  },
  legend: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 8,
    padding: 8,
    gap: 5,
  },
  legendRow:  { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot:  { width: 10, height: 10, borderRadius: 9999 },
  legendText: { fontSize: 10, color: C.textPri, fontWeight: '500' },
  satelliteBtn: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  satelliteText: { fontSize: 12, color: C.textPri, fontWeight: '600' },
  zoomControls: { position: 'absolute', bottom: 10, right: 10, gap: 4 },
  zoomBtn: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomText: { fontSize: 18, color: C.textPri, fontWeight: '600', lineHeight: 22 },
});

// ─── Screen styles ────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  header: {
    backgroundColor: C.primary,
    paddingTop: 56,
    paddingBottom: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  headerCaption: { fontSize: typography.size.xs, color: 'rgba(255,255,255,0.7)', marginBottom: 2 },
  headerName:    { fontSize: typography.size.md, fontWeight: typography.weight.bold, color: '#fff' },
  bellBtn: { position: 'relative', padding: 6 },
  bellBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 9999,
    backgroundColor: C.error,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: C.primary,
  },
  bellBadgeText: { fontSize: 9, color: '#fff', fontWeight: '700' },
  scroll:  { flex: 1 },
  content: { padding: 16, gap: 14 },
  sectionLabel: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.bold,
    color: C.textPri,
  },
  adStack: { gap: 10 },
  adScroll: { marginHorizontal: -16 },
  routeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.surface,
    borderRadius: 14,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: '#B2D8C8',
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  routeInfo:  { flex: 1, gap: 2 },
  routeTitle: { fontSize: typography.size.base, fontWeight: typography.weight.bold, color: C.textPri },
  routeSub:   { fontSize: typography.size.xs, color: C.textSec },
  goBtn: {
    backgroundColor: C.primary,
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  goBtnText: { color: '#fff', fontWeight: typography.weight.bold, fontSize: typography.size.sm },
  progressCard: {
    backgroundColor: C.surface,
    borderRadius: 12,
    padding: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E0EDE8',
  },
  progressRow:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressLabel:   { fontSize: typography.size.sm, fontWeight: typography.weight.semibold, color: C.textPri },
  progressCount:   { fontSize: typography.size.sm, color: C.textSec },
  progressBarBg:   { height: 8, backgroundColor: '#D6EAE0', borderRadius: 9999, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: C.primary, borderRadius: 9999 },
});
