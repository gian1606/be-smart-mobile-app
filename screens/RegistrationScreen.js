import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, KeyboardAvoidingView,
  Platform, Modal, FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { batangasBarangays } from '../mock/data';

const ROLES = [
  {
    key: 'resident',
    label: 'Resident',
    description: 'Report bins & earn ECO',
    icon: 'person-outline',
  },
  {
    key: 'buyer',
    label: 'MRF Buyer',
    description: 'Reserve & purchase recyclables',
    icon: 'business-outline',
  },
];

function BarangayPicker({ value, onChange }) {
  const [visible, setVisible] = useState(false);

  function select(b) {
    onChange(b);
    setVisible(false);
  }

  return (
    <>
      {/* Trigger */}
      <TouchableOpacity
        style={styles.pickerTrigger}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <Ionicons name="location-outline" size={18} color={colors.textMuted} />
        <Text style={[styles.pickerTriggerText, !value && { color: colors.textMuted }]}>
          {value || 'Select Barangay'}
        </Text>
        <Ionicons name="chevron-down" size={16} color={colors.textMuted} />
      </TouchableOpacity>

      {/* Modal sheet */}
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.sheetOverlay}>
          <TouchableOpacity style={styles.sheetBackdrop} onPress={() => setVisible(false)} />
          <View style={styles.sheet}>

            {/* Header */}
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Select Barangay</Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Ionicons name="close" size={22} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* List */}
            <FlatList
              data={batangasBarangays}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const isSelected = item === value;
                return (
                  <TouchableOpacity
                    style={[styles.optionRow, isSelected && styles.optionRowSelected]}
                    onPress={() => select(item)}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={isSelected ? 'location' : 'location-outline'}
                      size={16}
                      color={isSelected ? colors.primary : colors.textSecondary}
                    />
                    <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                      {item}
                    </Text>
                    {isSelected && (
                      <Ionicons name="checkmark" size={16} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                );
              }}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

export default function RegistrationScreen({ navigation, setIsAuthenticated }) {
  const [role, setRole]               = useState('');
  const [name, setName]               = useState('');
  const [email, setEmail]             = useState('');
  const [phone, setPhone]             = useState('');
  const [barangay, setBarangay]       = useState('');
  const [password, setPassword]       = useState('');
  const [confirm, setConfirm]         = useState('');
  const [showPass, setShowPass]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError]             = useState('');

  function handleRegister() {
    if (!role) {
      setError('Please select an account type.');
      return;
    }
    if (!name || !email || !phone || !barangay || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    navigation.navigate('OTP', { role });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join the BE-SMART community</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Account type */}
          <Text style={styles.fieldLabel}>Account Type</Text>
          <View style={styles.roleRow}>
            {ROLES.map((r) => {
              const isSelected = role === r.key;
              return (
                <TouchableOpacity
                  key={r.key}
                  style={[styles.roleCard, isSelected && styles.roleCardSelected]}
                  onPress={() => setRole(r.key)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.roleIconWrap, isSelected && styles.roleIconWrapSelected]}>
                    <Ionicons name={r.icon} size={22} color={isSelected ? '#fff' : colors.textSecondary} />
                  </View>
                  <Text style={[styles.roleLabel, isSelected && styles.roleLabelSelected]}>
                    {r.label}
                  </Text>
                  <Text style={[styles.roleDesc, isSelected && styles.roleDescSelected]}>
                    {r.description}
                  </Text>
                  {isSelected && (
                    <View style={styles.roleCheck}>
                      <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor={colors.textMuted}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.textMuted}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor={colors.textMuted}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          {/* Barangay picker */}
          <BarangayPicker value={barangay} onChange={setBarangay} />

          {/* Password */}
          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor={colors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPass}
            />
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
              <Ionicons
                name={showPass ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm Password"
              placeholderTextColor={colors.textMuted}
              value={confirm}
              onChangeText={setConfirm}
              secureTextEntry={!showConfirm}
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
              <Ionicons
                name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.createBtn} onPress={handleRegister} activeOpacity={0.8}>
            <Text style={styles.createBtnText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.loginLink}>
              Already have an account?{' '}
              <Text style={styles.loginLinkBold}>Log In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.secondary,
    borderRadius: 18,
    padding: 24,
    gap: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 16,
    elevation: 4,
  },
  title: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    marginTop: -8,
  },
  errorText: {
    fontSize: typography.size.sm,
    color: colors.error,
    backgroundColor: colors.errorLight,
    padding: 10,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 8,
    padding: 12,
    fontSize: typography.size.base,
    color: colors.textPrimary,
    backgroundColor: colors.background,
  },

  // ── Role selector ──
  fieldLabel: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.textSecondary,
    marginBottom: -6,
  },
  roleRow: {
    flexDirection: 'row',
    gap: 10,
  },
  roleCard: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.cardBorder,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.background,
    position: 'relative',
  },
  roleCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.successLight,
  },
  roleIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleIconWrapSelected: {
    backgroundColor: colors.primary,
  },
  roleLabel: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  roleLabelSelected: {
    color: colors.primary,
  },
  roleDesc: {
    fontSize: typography.size.xs,
    color: colors.textMuted,
    textAlign: 'center',
  },
  roleDescSelected: {
    color: colors.textSecondary,
  },
  roleCheck: {
    position: 'absolute',
    top: 8,
    right: 8,
  },

  // ── Barangay picker trigger ──
  pickerTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 8,
    padding: 12,
    backgroundColor: colors.background,
  },
  pickerTriggerText: {
    flex: 1,
    fontSize: typography.size.base,
    color: colors.textPrimary,
  },

  // ── Bottom sheet ──
  sheetOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheetBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    backgroundColor: colors.secondary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingHorizontal: 20,
    maxHeight: '70%',
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sheetTitle: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  searchWrapper: {},
  searchInput: {},
  emptyState: {},
  emptyText: {},
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 13,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  optionRowSelected: {
    backgroundColor: colors.successLight,
    borderRadius: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 0,
    marginBottom: 1,
  },
  optionText: {
    flex: 1,
    fontSize: typography.size.base,
    color: colors.textPrimary,
  },
  optionTextSelected: {
    color: colors.primary,
    fontWeight: typography.weight.semibold,
  },
  emptyState: {},
  emptyText: {},

  // ── Password fields ──
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.background,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: typography.size.base,
    color: colors.textPrimary,
  },
  createBtn: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  createBtnText: {
    color: colors.secondary,
    fontSize: typography.size.base,
    fontWeight: typography.weight.bold,
  },
  loginLink: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  loginLinkBold: {
    color: colors.primary,
    fontWeight: typography.weight.bold,
  },
});
