import {
  View, Text, ScrollView, TouchableOpacity,
  Modal, StyleSheet, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

// ─── About BE SMART content ───────────────────────────────────────────────────
function AboutContent() {
  return (
    <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
      <View style={styles.logoRow}>
        <View style={styles.logoCircle}>
          <Ionicons name="leaf" size={32} color="#fff" />
        </View>
        <View style={styles.logoText}>
          <Text style={styles.appName}>BE-SMART</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
        </View>
      </View>

      <Text style={styles.tagline}>
        Your city. Your rewards. Your future.
      </Text>

      <Section title="What is BE-SMART?">
        BE-SMART (Batangas Eco-Smart Monitoring and Rewards Technology) is a waste management
        platform for Batangas City that connects residents, MRF workers, garbage collectors,
        and material buyers in one unified system.
      </Section>

      <Section title="How it works">
        Residents report full bins and bring recyclables to MRF facilities to earn ECO tokens.
        These tokens can be redeemed for rewards from partner establishments. Garbage collectors
        use the app to manage their daily routes, while MRF buyers can bid on full facilities
        for material pickup.
      </Section>

      <Section title="ECO Tokens">
        ECO is the blockchain-based token used within the BE-SMART ecosystem. Tokens are earned
        by participating in waste management activities and can be redeemed at partner stores
        and establishments across Batangas City.
      </Section>

      <Section title="Our Mission">
        To promote a cleaner, greener Batangas City by incentivizing proper waste segregation
        and recycling through technology and community engagement.
      </Section>

      <Text style={styles.footer}>
        © 2025 BE-SMART · Batangas City Government{'\n'}
        All rights reserved.
      </Text>
    </ScrollView>
  );
}

// ─── Help & Support content ───────────────────────────────────────────────────
function HelpContent() {
  const faqs = [
    {
      q: 'How do I earn ECO tokens?',
      a: 'Scan bin QR codes to report their status, or bring recyclables to an MRF facility. The MRF staff will scan your QR code and issue ECO tokens based on the waste type and weight.',
    },
    {
      q: 'How do I redeem my ECO tokens?',
      a: 'Go to the Rewards screen, choose a reward, and tap Redeem. Present the generated QR code to the partner establishment or MRF staff to claim your reward.',
    },
    {
      q: 'What is my Household QR Code?',
      a: 'Your Household QR Code is a unique identifier for your account. Present it to MRF staff when dropping off recyclables so they can issue ECO tokens directly to your account.',
    },
    {
      q: 'What types of waste are accepted?',
      a: 'MRF facilities accept Recyclables (plastics, paper, metal), Biodegradable waste, and Special Waste (electronics, batteries). Each type has a different ECO token rate per kilogram.',
    },
    {
      q: 'How do I find the nearest MRF?',
      a: 'The map on your Home screen shows all MRF locations in Batangas City. Green markers indicate available facilities, red markers indicate full ones.',
    },
    {
      q: 'My ECO tokens are not showing up. What do I do?',
      a: 'Ensure the MRF staff scanned your QR code correctly. If the issue persists, contact support using the details below.',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>

      <View style={styles.contactCard}>
        <Ionicons name="headset-outline" size={28} color={colors.primary} />
        <View style={styles.contactInfo}>
          <Text style={styles.contactTitle}>Contact Support</Text>
          <Text style={styles.contactLine}>📧  support@besmart.gov.ph</Text>
          <Text style={styles.contactLine}>📞  (043) 300-0000</Text>
          <Text style={styles.contactLine}>🕐  Mon–Fri, 8:00 AM – 5:00 PM</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

      {faqs.map((faq, i) => (
        <View key={i} style={styles.faqCard}>
          <View style={styles.faqQ}>
            <View style={styles.faqBullet}>
              <Text style={styles.faqBulletText}>Q</Text>
            </View>
            <Text style={styles.faqQuestion}>{faq.q}</Text>
          </View>
          <Text style={styles.faqAnswer}>{faq.a}</Text>
        </View>
      ))}

      <Text style={styles.footer}>
        For urgent concerns, visit the Batangas City Hall — Environment Office.
      </Text>
    </ScrollView>
  );
}

// ─── Reusable section block ───────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionBody}>{children}</Text>
    </View>
  );
}

// ─── Main modal ───────────────────────────────────────────────────────────────
export default function InfoModal({ visible, onClose, type, accentColor }) {
  const accent = accentColor || colors.primary;
  const isAbout = type === 'about';

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <TouchableOpacity
          style={StyleSheet.absoluteFillObject}
          onPress={onClose}
          activeOpacity={1}
        />
        <View style={styles.sheet}>
          {/* Header */}
          <View style={[styles.header, { backgroundColor: accent }]}>
            <Text style={styles.headerTitle}>
              {isAbout ? 'About BE-SMART' : 'Help & Support'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {isAbout ? <AboutContent /> : <HelpContent />}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '88%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: { fontSize: typography.size.lg, fontWeight: typography.weight.bold, color: '#fff' },
  closeBtn: { padding: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 9999 },

  body: { padding: 20, gap: 16, paddingBottom: 36 },

  // About
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  logoCircle: {
    width: 60, height: 60, borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  logoText: { gap: 2 },
  appName: { fontSize: typography.size.xl, fontWeight: typography.weight.bold, color: colors.textPrimary },
  appVersion: { fontSize: typography.size.xs, color: colors.textMuted },
  tagline: {
    fontSize: typography.size.base,
    color: colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  section: { gap: 6 },
  sectionTitle: { fontSize: typography.size.base, fontWeight: typography.weight.bold, color: colors.textPrimary },
  sectionBody: { fontSize: typography.size.sm, color: colors.textSecondary, lineHeight: 22 },
  footer: {
    fontSize: typography.size.xs,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 8,
  },

  // Help
  contactCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    backgroundColor: colors.secondary,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  contactInfo: { flex: 1, gap: 4 },
  contactTitle: { fontSize: typography.size.base, fontWeight: typography.weight.bold, color: colors.textPrimary, marginBottom: 4 },
  contactLine: { fontSize: typography.size.sm, color: colors.textSecondary },
  faqCard: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  faqQ: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  faqBullet: {
    width: 22, height: 22, borderRadius: 9999,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
    flexShrink: 0, marginTop: 1,
  },
  faqBulletText: { fontSize: 10, fontWeight: typography.weight.bold, color: '#fff' },
  faqQuestion: { flex: 1, fontSize: typography.size.sm, fontWeight: typography.weight.bold, color: colors.textPrimary, lineHeight: 20 },
  faqAnswer: { fontSize: typography.size.sm, color: colors.textSecondary, lineHeight: 20, paddingLeft: 32 },
});
