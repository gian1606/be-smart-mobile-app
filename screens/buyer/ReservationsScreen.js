import { useState } from 'react';
import {
  View, Text, TouchableOpacity, FlatList,
  StyleSheet, Modal, TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { mockMRFLocations, mockMRFReservations } from '../../mock/data';

const fullMRFs = mockMRFLocations.filter((m) => m.status === 'full');

const STATUS_CONFIG = {
  pending:   { label: 'Bid Pending', color: colors.warning,     bg: '#FFF3E0', icon: 'time-outline'              },
  won:       { label: 'Bid Won',     color: colors.buyerPrimary, bg: colors.buyerLight, icon: 'trophy-outline'   },
  completed: { label: 'Completed',   color: colors.buyerPrimary, bg: colors.buyerLight, icon: 'checkmark-circle-outline' },
  lost:      { label: 'Bid Lost',    color: colors.error,        bg: colors.errorLight, icon: 'close-circle-outline'     },
};

function MRFBidCard({ mrf, onBid }) {
  return (
    <View style={styles.bidCard}>
      <View style={styles.bidCardTop}>
        <View style={styles.mrfIconWrapper}>
          <Ionicons name="business" size={20} color={colors.secondary} />
        </View>
        <View style={styles.bidCardInfo}>
          <Text style={styles.bidCardName}>{mrf.name}</Text>
          <Text style={styles.bidCardBarangay}>{mrf.barangay}</Text>
          <View style={styles.fullBadge}>
            <View style={styles.fullDot} />
            <Text style={styles.fullBadgeText}>Full — Open for bidding</Text>
          </View>
        </View>
      </View>

      {/* Pricing info */}
      <View style={styles.pricingRow}>
        <View style={styles.pricingItem}>
          <Text style={styles.pricingLabel}>Starting Bid</Text>
          <Text style={styles.pricingValue}>{mrf.startingBid}</Text>
        </View>
        <View style={styles.pricingDivider} />
        <View style={styles.pricingItem}>
          <Text style={styles.pricingLabel}>Buyout Price</Text>
          <Text style={[styles.pricingValue, styles.buyoutValue]}>{mrf.buyoutPrice}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.bidBtn}
        onPress={() => onBid(mrf)}
        activeOpacity={0.8}
      >
        <Ionicons name="hammer-outline" size={15} color={colors.secondary} />
        <Text style={styles.bidBtnText}>Place Bid</Text>
      </TouchableOpacity>
    </View>
  );
}

function BidRow({ bid }) {
  const cfg = STATUS_CONFIG[bid.status] || STATUS_CONFIG.pending;
  return (
    <View style={styles.bidRow}>
      <View style={[styles.bidRowIcon, { backgroundColor: cfg.bg }]}>
        <Ionicons name={cfg.icon} size={20} color={cfg.color} />
      </View>
      <View style={styles.bidRowInfo}>
        <Text style={styles.bidRowName}>{bid.mrfName}</Text>
        <Text style={styles.bidRowMeta}>{bid.material} · {bid.weight}</Text>
        <Text style={styles.bidRowDate}>{bid.dateTime}</Text>
      </View>
      <View style={styles.bidRowRight}>
        <Text style={styles.bidRowAmount}>{bid.bidAmount}</Text>
        <View style={[styles.statusPill, { backgroundColor: cfg.bg }]}>
          <Text style={[styles.statusPillText, { color: cfg.color }]}>{cfg.label}</Text>
        </View>
        {bid.bids > 1 && (
          <Text style={styles.bidCount}>{bid.bids} bidders</Text>
        )}
      </View>
    </View>
  );
}

export default function ReservationsScreen() {
  const [activeTab, setActiveTab]       = useState('available');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMRF, setSelectedMRF]   = useState(null);
  const [bidAmount, setBidAmount]       = useState('');
  const [bidError, setBidError]         = useState('');
  const [step, setStep]                 = useState('input'); // 'input' | 'confirm' | 'done'

  function handleBid(mrf) {
    setSelectedMRF(mrf);
    setBidAmount('');
    setBidError('');
    setStep('input');
    setModalVisible(true);
  }

  function submitBid() {
    const val = parseFloat(bidAmount.replace(/[^0-9.]/g, ''));
    const minBid = parseFloat(selectedMRF?.startingBid?.replace(/[^0-9.]/g, '') || '0');
    if (!val || val <= 0) {
      setBidError('Please enter a valid bid amount.');
      return;
    }
    if (val < minBid) {
      setBidError(`Bid must be at least ${selectedMRF?.startingBid}.`);
      return;
    }
    setBidError('');
    setStep('confirm');
  }

  function handleBuyout() {
    setBidAmount(selectedMRF?.buyoutPrice?.replace(/[^0-9.]/g, '') || '');
    setBidError('');
    setStep('confirm');
  }

  function confirmBid() {
    setStep('done');
  }

  return (
    <View style={styles.screen}>

      <View style={styles.header}>
        <Text style={styles.title}>Bidding</Text>
        <Text style={styles.subtitle}>Place bids on full MRFs to secure materials</Text>
      </View>

      <View style={styles.toggleWrapper}>
        {[
          { key: 'available', label: 'Open Bids' },
          { key: 'mine',      label: 'My Bids'   },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.togglePill, activeTab === tab.key && styles.togglePillActive]}
            onPress={() => setActiveTab(tab.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.toggleText, activeTab === tab.key && styles.toggleTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'available' ? (
        <FlatList
          data={fullMRFs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MRFBidCard mrf={item} onBid={handleBid} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="business-outline" size={48} color={colors.textMuted} />
              <Text style={styles.emptyText}>No full MRFs open for bidding</Text>
            </View>
          }
        />
      ) : (
        <FlatList
          data={mockMRFReservations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BidRow bid={item} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="hammer-outline" size={48} color={colors.textMuted} />
              <Text style={styles.emptyText}>No bids placed yet</Text>
            </View>
          }
        />
      )}

      {/* Bid modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.modalCard}>
            {step === 'done' ? (
              <>
                <Ionicons name="checkmark-circle" size={56} color={colors.buyerPrimary} />
                <Text style={styles.modalTitle}>Bid Placed!</Text>
                <Text style={styles.modalSubtitle}>
                  Your bid of{' '}
                  <Text style={{ fontWeight: typography.weight.bold, color: colors.textPrimary }}>
                    ₱{parseFloat(bidAmount.replace(/[^0-9.]/g, '')).toLocaleString()}
                  </Text>{' '}
                  on{' '}
                  <Text style={{ fontWeight: typography.weight.bold, color: colors.textPrimary }}>
                    {selectedMRF?.name}
                  </Text>{' '}
                  has been submitted. You'll be notified if you win.
                </Text>
                <TouchableOpacity
                  style={styles.modalBtnFull}
                  onPress={() => { setModalVisible(false); setStep('input'); }}
                >
                  <Text style={styles.modalBtnText}>Done</Text>
                </TouchableOpacity>
              </>
            ) : step === 'confirm' ? (
              <>
                <View style={styles.confirmIconWrap}>
                  <Ionicons name="hammer-outline" size={28} color={colors.buyerPrimary} />
                </View>
                <Text style={styles.modalTitle}>Confirm Your Bid</Text>

                {/* Bid summary */}
                <View style={styles.confirmSummary}>
                  <View style={styles.confirmRow}>
                    <Text style={styles.confirmLabel}>MRF</Text>
                    <Text style={styles.confirmValue}>{selectedMRF?.name}</Text>
                  </View>
                  <View style={styles.confirmDivider} />
                  <View style={styles.confirmRow}>
                    <Text style={styles.confirmLabel}>Location</Text>
                    <Text style={styles.confirmValue}>{selectedMRF?.barangay}</Text>
                  </View>
                  <View style={styles.confirmDivider} />
                  <View style={styles.confirmRow}>
                    <Text style={styles.confirmLabel}>Your Bid</Text>
                    <Text style={[styles.confirmValue, styles.confirmBidAmount]}>
                      ₱{parseFloat(bidAmount.replace(/[^0-9.]/g, '')).toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.confirmDivider} />
                  <View style={styles.confirmRow}>
                    <Text style={styles.confirmLabel}>Buyout Price</Text>
                    <Text style={styles.confirmValue}>{selectedMRF?.buyoutPrice}</Text>
                  </View>
                </View>

                <Text style={styles.modalSubtitle}>
                  Once submitted, your bid cannot be withdrawn. The highest bid at closing wins.
                </Text>

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={styles.modalCancelBtn}
                    onPress={() => setStep('input')}
                  >
                    <Text style={styles.modalCancelText}>Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalBtn} onPress={confirmBid}>
                    <Ionicons name="checkmark" size={16} color={colors.secondary} />
                    <Text style={styles.modalBtnText}>Confirm Bid</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                {/* MRF info */}
                <View style={styles.modalMRFInfo}>
                  <View style={styles.modalMRFIcon}>
                    <Ionicons name="business" size={22} color={colors.secondary} />
                  </View>
                  <View style={{ gap: 2, flex: 1 }}>
                    <Text style={styles.modalMRFName}>{selectedMRF?.name}</Text>
                    <Text style={styles.modalMRFBarangay}>{selectedMRF?.barangay}</Text>
                  </View>
                  <View style={styles.fullBadgeModal}>
                    <View style={styles.fullDot} />
                    <Text style={styles.fullBadgeText}>Full</Text>
                  </View>
                </View>

                <Text style={styles.modalTitle}>Place Your Bid</Text>
                <Text style={styles.modalSubtitle}>
                  Enter the amount you're willing to pay for the materials at this MRF. The highest bid wins.
                </Text>

                {/* Starting bid / buyout info */}
                <View style={styles.modalPricingRow}>
                  <View style={styles.modalPricingItem}>
                    <Text style={styles.modalPricingLabel}>Starting Bid</Text>
                    <Text style={styles.modalPricingValue}>{selectedMRF?.startingBid}</Text>
                  </View>
                  <View style={styles.pricingDivider} />
                  <View style={styles.modalPricingItem}>
                    <Text style={styles.modalPricingLabel}>Buyout Price</Text>
                    <Text style={[styles.modalPricingValue, styles.buyoutValue]}>{selectedMRF?.buyoutPrice}</Text>
                  </View>
                </View>

                {/* Bid input */}
                <View style={styles.bidInputWrapper}>
                  <Text style={styles.pesoSign}>₱</Text>
                  <TextInput
                    style={styles.bidInput}
                    placeholder="0.00"
                    placeholderTextColor={colors.textMuted}
                    value={bidAmount}
                    onChangeText={setBidAmount}
                    keyboardType="numeric"
                    autoFocus
                  />
                </View>

                {bidError ? (
                  <Text style={styles.bidError}>{bidError}</Text>
                ) : null}

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={styles.modalCancelBtn}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.modalCancelText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalBtn} onPress={submitBid}>
                    <Ionicons name="hammer-outline" size={16} color={colors.secondary} />
                    <Text style={styles.modalBtnText}>Submit Bid</Text>
                  </TouchableOpacity>
                </View>

                {/* Buyout option */}
                <TouchableOpacity style={styles.buyoutBtn} onPress={handleBuyout} activeOpacity={0.8}>
                  <Ionicons name="flash-outline" size={15} color={colors.buyerPrimary} />
                  <Text style={styles.buyoutBtnText}>Buyout for {selectedMRF?.buyoutPrice}</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.buyerPrimary,
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    gap: 4,
  },
  title:    { fontSize: typography.size.xl, fontWeight: typography.weight.bold, color: colors.secondary },
  subtitle: { fontSize: typography.size.sm, color: 'rgba(255,255,255,0.75)' },
  toggleWrapper: {
    flexDirection: 'row',
    backgroundColor: colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  togglePill: {
    flex: 1, paddingVertical: 9, borderRadius: 9999, alignItems: 'center',
    backgroundColor: colors.background, borderWidth: 1, borderColor: colors.cardBorder,
  },
  togglePillActive: { backgroundColor: colors.buyerPrimary, borderColor: colors.buyerPrimary },
  toggleText: { fontSize: typography.size.sm, fontWeight: typography.weight.semibold, color: colors.textSecondary },
  toggleTextActive: { color: colors.secondary },
  list: { padding: 16, paddingBottom: 40, gap: 12 },

  // MRF bid card
  bidCard: {
    backgroundColor: colors.secondary,
    borderRadius: 14,
    padding: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  bidCardTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  mrfIconWrapper: {
    width: 44, height: 44, borderRadius: 9999,
    backgroundColor: colors.error, justifyContent: 'center', alignItems: 'center',
  },
  bidCardInfo: { flex: 1, gap: 3 },
  bidCardName: { fontSize: typography.size.base, fontWeight: typography.weight.bold, color: colors.textPrimary },
  bidCardBarangay: { fontSize: typography.size.xs, color: colors.textSecondary },
  fullBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  fullDot: { width: 6, height: 6, borderRadius: 9999, backgroundColor: colors.error },
  fullBadgeText: { fontSize: typography.size.xs, color: colors.error, fontWeight: typography.weight.semibold },
  bidBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: colors.buyerPrimary, borderRadius: 8, paddingVertical: 11,
  },
  bidBtnText: { color: colors.secondary, fontSize: typography.size.sm, fontWeight: typography.weight.bold },

  // Pricing row on card
  pricingRow: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  pricingItem: { flex: 1, alignItems: 'center', gap: 3 },
  pricingDivider: { width: 1, backgroundColor: colors.cardBorder, marginVertical: 2 },
  pricingLabel: { fontSize: typography.size.xs, color: colors.textSecondary },
  pricingValue: { fontSize: typography.size.base, fontWeight: typography.weight.bold, color: colors.textPrimary },
  buyoutValue:  { color: colors.buyerPrimary },

  // Bid history row
  bidRow: {
    backgroundColor: colors.secondary, borderRadius: 12, padding: 14,
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderWidth: 1, borderColor: colors.cardBorder,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  bidRowIcon: { width: 40, height: 40, borderRadius: 9999, justifyContent: 'center', alignItems: 'center' },
  bidRowInfo: { flex: 1, gap: 2 },
  bidRowName: { fontSize: typography.size.sm, fontWeight: typography.weight.bold, color: colors.textPrimary },
  bidRowMeta: { fontSize: typography.size.xs, color: colors.textSecondary },
  bidRowDate: { fontSize: typography.size.xs, color: colors.textMuted },
  bidRowRight: { alignItems: 'flex-end', gap: 4 },
  bidRowAmount: { fontSize: typography.size.sm, fontWeight: typography.weight.bold, color: colors.textPrimary },
  statusPill: { borderRadius: 9999, paddingHorizontal: 8, paddingVertical: 2 },
  statusPillText: { fontSize: typography.size.xs, fontWeight: typography.weight.semibold },
  bidCount: { fontSize: typography.size.xs, color: colors.textMuted },

  emptyState: { alignItems: 'center', gap: 12, paddingTop: 60 },
  emptyText: { fontSize: typography.size.base, color: colors.textMuted },

  // Modal
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center', alignItems: 'center', padding: 24,
  },
  modalCard: {
    backgroundColor: colors.secondary, borderRadius: 18, padding: 24,
    width: '100%', alignItems: 'center', gap: 14,
  },
  modalMRFInfo: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.background, borderRadius: 12, padding: 14, width: '100%',
  },
  modalMRFIcon: {
    width: 44, height: 44, borderRadius: 9999,
    backgroundColor: colors.buyerPrimary, justifyContent: 'center', alignItems: 'center',
  },
  modalMRFName: { fontSize: typography.size.base, fontWeight: typography.weight.bold, color: colors.textPrimary },
  modalMRFBarangay: { fontSize: typography.size.xs, color: colors.textSecondary },
  fullBadgeModal: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  modalTitle: { fontSize: typography.size.lg, fontWeight: typography.weight.bold, color: colors.textPrimary, textAlign: 'center' },
  modalSubtitle: { fontSize: typography.size.sm, color: colors.textSecondary, textAlign: 'center', lineHeight: 20 },
  bidInputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1.5, borderColor: colors.buyerPrimary, borderRadius: 10,
    paddingHorizontal: 14, width: '100%', backgroundColor: colors.background,
  },
  pesoSign: { fontSize: typography.size.xl, fontWeight: typography.weight.bold, color: colors.buyerPrimary, marginRight: 4 },
  bidInput: {
    flex: 1, paddingVertical: 14,
    fontSize: typography.size.xl, fontWeight: typography.weight.bold, color: colors.textPrimary,
  },
  bidError: {
    fontSize: typography.size.xs, color: colors.error,
    backgroundColor: colors.errorLight, borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 8, width: '100%', textAlign: 'center',
  },
  modalActions: { flexDirection: 'row', gap: 12, width: '100%' },
  modalCancelBtn: {
    flex: 1, borderWidth: 1, borderColor: colors.cardBorder,
    borderRadius: 8, paddingVertical: 12, alignItems: 'center',
  },
  modalCancelText: { fontSize: typography.size.base, color: colors.textSecondary, fontWeight: typography.weight.medium },
  modalBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    backgroundColor: colors.buyerPrimary, borderRadius: 8, paddingVertical: 12,
  },
  modalBtnFull: {
    width: '100%', alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.buyerPrimary, borderRadius: 8, paddingVertical: 14,
  },
  modalBtnText: { color: colors.secondary, fontWeight: typography.weight.bold, fontSize: typography.size.base },

  // Pricing row in modal
  modalPricingRow: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    width: '100%',
  },
  modalPricingItem: { flex: 1, alignItems: 'center', gap: 4 },
  modalPricingLabel: { fontSize: typography.size.xs, color: colors.textSecondary },
  modalPricingValue: { fontSize: typography.size.md, fontWeight: typography.weight.bold, color: colors.textPrimary },

  // Buyout button
  buyoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    width: '100%',
    borderWidth: 1.5,
    borderColor: colors.buyerPrimary,
    borderRadius: 8,
    paddingVertical: 11,
    backgroundColor: colors.buyerLight,
  },
  buyoutBtnText: { fontSize: typography.size.sm, fontWeight: typography.weight.bold, color: colors.buyerPrimary },

  // Confirmation step
  confirmIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 9999,
    backgroundColor: colors.buyerLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.buyerPrimary,
  },
  confirmSummary: {
    width: '100%',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    gap: 0,
  },
  confirmRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  confirmDivider: { height: 1, backgroundColor: colors.cardBorder },
  confirmLabel: { fontSize: typography.size.sm, color: colors.textSecondary },
  confirmValue: { fontSize: typography.size.sm, fontWeight: typography.weight.semibold, color: colors.textPrimary },
  confirmBidAmount: { fontSize: typography.size.md, fontWeight: typography.weight.bold, color: colors.buyerPrimary },
});
