import { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { mockUser } from '../../mock/data';
import ChangePasswordModal from '../../components/ChangePasswordModal';
import InfoModal from '../../components/InfoModal';

export default function ProfileScreen({ setIsAuthenticated }) {
  const [changePwVisible, setChangePwVisible] = useState(false);
  const [qrVisible, setQrVisible] = useState(false);
  const [infoModal, setInfoModal] = useState(null);

  const settingsItems = [
    { icon: 'lock-closed-outline',        label: 'Change Password', onPress: () => setChangePwVisible(true) },
    { icon: 'information-circle-outline', label: 'About BE SMART',  onPress: () => setInfoModal('about')    },
    { icon: 'help-circle-outline',        label: 'Help & Support',  onPress: () => setInfoModal('help')     },
  ];

  const infoItems = [
    { icon: 'mail-outline',     label: 'Email',    value: mockUser.email    },
    { icon: 'call-outline',     label: 'Phone',    value: mockUser.phone    },
    { icon: 'home-outline',     label: 'Address',  value: mockUser.address  },
    { icon: 'location-outline', label: 'Barangay', value: mockUser.barangay },
  ];

  return (
    <>
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{mockUser.initials}</Text>
          </View>
          <Text style={styles.name}>{mockUser.name}</Text>
          <View style={styles.barangayBadge}>
            <Text style={styles.barangayText}>{mockUser.barangay}</Text>
          </View>
          <Text style={styles.memberSince}>Member since {mockUser.memberSince}</Text>
        </View>

        <View style={styles.statsRow}>
          {[
            { label: 'ECO Earned',     value: mockUser.totalEarned.toLocaleString() },
            { label: 'Bins Reported',  value: mockUser.binsReported },
            { label: 'Items Redeemed', value: mockUser.itemsRedeemed },
          ].map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          {infoItems.map((item) => (
            <View key={item.label} style={styles.infoRow}>
              <Ionicons name={item.icon} size={18} color={colors.textSecondary} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Text style={styles.infoValue}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Household QR Code */}
        <TouchableOpacity
          style={styles.qrCard}
          onPress={() => setQrVisible(true)}
          activeOpacity={0.8}
        >
          <View style={styles.qrIconWrap}>
            <Ionicons name="qr-code-outline" size={24} color={colors.primary} />
          </View>
          <View style={styles.qrInfo}>
            <Text style={styles.qrTitle}>View Household QR Code</Text>
            <Text style={styles.qrSub}>Present to MRF staff for reward redemption</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
        </TouchableOpacity>

        <View style={styles.sectionCard}>
          {settingsItems.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.settingsRow, index < settingsItems.length - 1 && styles.settingsRowBorder]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <Ionicons name={item.icon} size={18} color={colors.textSecondary} />
              <Text style={styles.settingsLabel}>{item.label}</Text>
              <View style={styles.settingsRight}>
                {item.value && <Text style={styles.settingsValue}>{item.value}</Text>}
                <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => setIsAuthenticated(false, null)}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={18} color={colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Household QR Modal */}
      <Modal visible={qrVisible} transparent animationType="fade">
        <View style={styles.qrModalOverlay}>
          <TouchableOpacity
            style={StyleSheet.absoluteFillObject}
            onPress={() => setQrVisible(false)}
            activeOpacity={1}
          />
          <View style={styles.qrModalCard}>
            <View style={styles.qrModalHeader}>
              <Text style={styles.qrModalTitle}>Household QR Code</Text>
              <TouchableOpacity onPress={() => setQrVisible(false)} style={styles.qrCloseBtn}>
                <Ionicons name="close" size={22} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.qrModalName}>{mockUser.name}</Text>
            <Text style={styles.qrModalBarangay}>{mockUser.barangay}</Text>
            <View style={styles.qrCodeWrap}>
              <QRCode
                value={`BESMART-RESIDENT-${mockUser.id}`}
                size={200}
                color={colors.textPrimary}
                backgroundColor={colors.secondary}
              />
            </View>
            <View style={styles.qrIdRow}>
              <Ionicons name="person-outline" size={14} color={colors.textMuted} />
              <Text style={styles.qrIdText}>ID: {mockUser.id}</Text>
            </View>
            <Text style={styles.qrHint}>
              Show this QR code to the MRF staff to redeem your eco rewards.
            </Text>
          </View>
        </View>
      </Modal>

      <ChangePasswordModal
        visible={changePwVisible}
        onClose={() => setChangePwVisible(false)}
        accentColor={colors.primary}
      />
      <InfoModal
        visible={infoModal !== null}
        onClose={() => setInfoModal(null)}
        type={infoModal}
        accentColor={colors.primary}
      />
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 60, gap: 18, paddingBottom: 40 },
  profileCard: { backgroundColor: colors.secondary, borderRadius: 18, padding: 24, alignItems: 'center', gap: 8, borderWidth: 1, borderColor: colors.cardBorder, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 10, elevation: 3 },
  avatar: { width: 80, height: 80, borderRadius: 9999, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  avatarText: { fontSize: typography.size.xl, fontWeight: typography.weight.bold, color: colors.secondary },
  name: { fontSize: typography.size.lg, fontWeight: typography.weight.bold, color: colors.textPrimary },
  barangayBadge: { backgroundColor: colors.successLight, borderWidth: 1, borderColor: '#A5D6A7', borderRadius: 9999, paddingHorizontal: 12, paddingVertical: 4 },
  barangayText: { fontSize: typography.size.xs, color: colors.primary, fontWeight: typography.weight.semibold },
  memberSince: { fontSize: typography.size.xs, color: colors.textMuted },
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: { flex: 1, backgroundColor: colors.secondary, borderRadius: 12, padding: 12, alignItems: 'center', gap: 4, borderWidth: 1, borderColor: colors.cardBorder, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  statValue: { fontSize: typography.size.lg, fontWeight: typography.weight.bold, color: colors.primary },
  statLabel: { fontSize: typography.size.xs, color: colors.textSecondary, textAlign: 'center' },
  sectionCard: { backgroundColor: colors.secondary, borderRadius: 14, padding: 16, gap: 14, borderWidth: 1, borderColor: colors.cardBorder, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  sectionTitle: { fontSize: typography.size.base, fontWeight: typography.weight.bold, color: colors.textPrimary },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  infoContent: { flex: 1, gap: 2 },
  infoLabel: { fontSize: typography.size.xs, color: colors.textSecondary },
  infoValue: { fontSize: typography.size.sm, color: colors.textPrimary, fontWeight: typography.weight.medium },
  settingsRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 4 },
  settingsRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.cardBorder, paddingBottom: 14 },
  settingsLabel: { flex: 1, fontSize: typography.size.sm, color: colors.textPrimary, fontWeight: typography.weight.medium },
  settingsRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  settingsValue: { fontSize: typography.size.xs, color: colors.textMuted },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 1.5, borderColor: colors.error, borderRadius: 10, paddingVertical: 14, backgroundColor: colors.secondary },
  logoutText: { color: colors.error, fontSize: typography.size.base, fontWeight: typography.weight.semibold },

  // QR card
  qrCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.secondary,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  qrIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.successLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A5D6A7',
  },
  qrInfo: { flex: 1, gap: 3 },
  qrTitle: { fontSize: typography.size.base, fontWeight: typography.weight.bold, color: colors.textPrimary },
  qrSub:   { fontSize: typography.size.xs, color: colors.textSecondary },

  // QR modal
  qrModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  qrModalCard: {
    backgroundColor: colors.secondary,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
  qrModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 4,
  },
  qrModalTitle: { fontSize: typography.size.lg, fontWeight: typography.weight.bold, color: colors.textPrimary },
  qrCloseBtn: {
    padding: 4,
    backgroundColor: colors.background,
    borderRadius: 9999,
  },
  qrModalName:     { fontSize: typography.size.md, fontWeight: typography.weight.bold, color: colors.textPrimary },
  qrModalBarangay: { fontSize: typography.size.sm, color: colors.textSecondary, marginTop: -4 },
  qrCodeWrap: {
    padding: 16,
    backgroundColor: colors.secondary,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginVertical: 8,
  },
  qrIdRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  qrIdText: { fontSize: typography.size.xs, color: colors.textMuted },
  qrHint: {
    fontSize: typography.size.xs,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 8,
  },
});
