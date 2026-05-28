import { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { mockMRFUser, mockMRFLocations, mockPartnerAds, mockMRFNotifications } from '../../mock/data';
import MRFMapCard from '../../components/MRFMapCard';
import AdCard from '../../components/AdCard';
import NotificationsModal from '../../components/NotificationsModal';

export default function HomeScreen() {
  const [notifVisible, setNotifVisible] = useState(false);
  const unread = mockMRFNotifications.filter((n) => !n.read).length;

  return (
    <View style={styles.screen}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning, {mockMRFUser.name.split(' ')[0]} 👋</Text>
          <Text style={styles.subtitle}>{mockMRFUser.facility}</Text>
        </View>
        <TouchableOpacity
          style={styles.bellBtn}
          onPress={() => setNotifVisible(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="notifications-outline" size={24} color={colors.secondary} />
          {unread > 0 && (
            <View style={styles.bellBadge}>
              <Text style={styles.bellBadgeText}>{unread}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>

        {/* MRF Map */}
        <MRFMapCard mrfLocations={mockMRFLocations} />

        {/* Check this out */}
        <Text style={styles.sectionLabel}>Check this out</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.adScroll} contentContainerStyle={{ paddingRight: 16 }}>
          {mockPartnerAds.map((ad, index) => (
            <AdCard key={ad.id} ad={ad} index={index} />
          ))}
        </ScrollView>

      </ScrollView>

      <NotificationsModal
        visible={notifVisible}
        onClose={() => setNotifVisible(false)}
        notifications={mockMRFNotifications}
        accentColor={colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 20,
  },
  greeting: { fontSize: typography.size.md, fontWeight: typography.weight.semibold, color: colors.secondary },
  subtitle: { fontSize: typography.size.sm, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  bellBtn: { position: 'relative', padding: 4 },
  bellBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 9999,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  bellBadgeText: { fontSize: 9, color: '#fff', fontWeight: '700' },
  scroll: { flex: 1 },
  content: { padding: 20, gap: 18, paddingBottom: 40 },
  sectionLabel: { fontSize: typography.size.md, fontWeight: typography.weight.semibold, color: colors.textPrimary },
  adStack: { gap: 10 },
  adScroll: { marginHorizontal: -20 },
});
