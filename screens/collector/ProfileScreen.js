import { useState } from 'react';
import {
  ScrollView, View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { mockCollectorUser } from '../../mock/data';
import ChangePasswordModal from '../../components/ChangePasswordModal';
import InfoModal from '../../components/InfoModal';

const C = {
  primary:  '#0D7A5F',
  primaryLt:'#1A9E7A',
  accent:   '#00E5A0',
  bg:       '#F4FAF7',
  surface:  '#FFFFFF',
  textPri:  '#0D1F1A',
  textSec:  '#6B8C81',
  success:  '#00C86A',
  error:    '#E53535',
  warning:  '#F5A623',
};

export default function CollectorProfileScreen({ setIsAuthenticated }) {
  const [changePwVisible, setChangePwVisible] = useState(false);
  const [infoModal, setInfoModal] = useState(null);

  const infoItems = [
    { icon: 'card-outline',     label: 'Collector ID', value: mockCollectorUser.collectorId },
    { icon: 'mail-outline',     label: 'Email',        value: mockCollectorUser.email },
    { icon: 'call-outline',     label: 'Phone',        value: mockCollectorUser.phone },
    { icon: 'location-outline', label: 'Zone',         value: mockCollectorUser.zone },
    { icon: 'home-outline',     label: 'Barangay',     value: mockCollectorUser.assignedBarangay },
  ];

  const settingsItems = [
    { icon: 'lock-closed-outline',        label: 'Change Password', onPress: () => setChangePwVisible(true) },
    { icon: 'information-circle-outline', label: 'About BE-SMART',  onPress: () => setInfoModal('about')    },
    { icon: 'help-circle-outline',        label: 'Help & Support',  onPress: () => setInfoModal('help')     },
  ];

  return (
    <>
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{mockCollectorUser.initials}</Text>
          </View>
          <Text style={styles.name}>{mockCollectorUser.name}</Text>
          <View style={styles.roleBadge}>
            <Ionicons name="car-outline" size={12} color={C.primary} />
            <Text style={styles.roleText}>Garbage Collector</Text>
          </View>
          <Text style={styles.memberSince}>Since {mockCollectorUser.memberSince}</Text>
        </View>

        <View style={styles.statsRow}>
          {[
            { label: 'Bins Today',  value: mockCollectorUser.binsCollectedToday },
            { label: 'Shifts Done', value: mockCollectorUser.shiftsCompleted },
            { label: 'Total Vol.',  value: `${mockCollectorUser.totalCollectedL} L` },
          ].map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          {infoItems.map((item) => (
            <View key={item.label} style={styles.infoRow}>
              <Ionicons name={item.icon} size={16} color={C.textSec} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Text style={styles.infoValue}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.sectionCard}>
          {settingsItems.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.settingsRow, index < settingsItems.length - 1 && styles.settingsRowBorder]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <Ionicons name={item.icon} size={16} color={C.textSec} />
              <Text style={styles.settingsLabel}>{item.label}</Text>
              <View style={styles.settingsRight}>
                {item.value && <Text style={styles.settingsValue}>{item.value}</Text>}
                <Ionicons name="chevron-forward" size={14} color={C.textSec} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => setIsAuthenticated(false, null)}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={18} color={C.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>

      <ChangePasswordModal
        visible={changePwVisible}
        onClose={() => setChangePwVisible(false)}
        accentColor='#0D7A5F'
      />
      <InfoModal
        visible={infoModal !== null}
        onClose={() => setInfoModal(null)}
        type={infoModal}
        accentColor='#0D7A5F'
      />
    </>
  );
}

const styles = StyleSheet.create({
  screen:   { flex: 1, backgroundColor: colors.background },
  content:  { padding: 20, paddingTop: 60, gap: 16, paddingBottom: 40 },
  profileCard: {
    backgroundColor: colors.secondary,
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 9999,
    backgroundColor: C.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    borderWidth: 3,
    borderColor: 'rgba(13,122,95,0.2)',
  },
  avatarText:   { fontSize: typography.size.xl, fontWeight: typography.weight.bold, color: '#fff' },
  name:         { fontSize: typography.size.lg, fontWeight: typography.weight.bold, color: C.textPri },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#E6F7F2',
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#B2D8C8',
  },
  roleText:     { fontSize: typography.size.xs, color: C.primary, fontWeight: typography.weight.semibold },
  memberSince:  { fontSize: typography.size.xs, color: C.textSec },
  statsRow:     { flexDirection: 'row', gap: 10 },
  statCard: {
    flex: 1,
    backgroundColor: C.surface,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: '#E0EDE8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  statValue: { fontSize: typography.size.lg, fontWeight: typography.weight.bold, color: C.primary },
  statLabel: { fontSize: typography.size.xs, color: C.textSec, textAlign: 'center' },
  sectionCard: {
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
  sectionTitle: { fontSize: typography.size.base, fontWeight: typography.weight.bold, color: C.textPri },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  infoContent: { flex: 1, gap: 2 },
  infoLabel: { fontSize: typography.size.xs, color: C.textSec },
  infoValue: { fontSize: typography.size.sm, color: C.textPri, fontWeight: typography.weight.medium },
  settingsRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 4 },
  settingsRowBorder: { borderBottomWidth: 1, borderBottomColor: '#E0EDE8', paddingBottom: 14 },
  settingsLabel: { flex: 1, fontSize: typography.size.sm, color: C.textPri, fontWeight: typography.weight.medium },
  settingsRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  settingsValue: { fontSize: typography.size.xs, color: C.textSec },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: C.error,
    borderRadius: 10,
    paddingVertical: 14,
    backgroundColor: C.surface,
  },
  logoutText: { color: C.error, fontSize: typography.size.base, fontWeight: typography.weight.semibold },
});
