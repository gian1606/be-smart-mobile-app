import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Modal, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function ChangePasswordModal({ visible, onClose, accentColor }) {
  const accent = accentColor || colors.primary;

  const [current, setCurrent]         = useState('');
  const [newPass, setNewPass]         = useState('');
  const [confirm, setConfirm]         = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError]             = useState('');
  const [success, setSuccess]         = useState(false);

  function handleSubmit() {
    if (!current || !newPass || !confirm) {
      setError('Please fill in all fields.');
      return;
    }
    if (newPass.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    if (newPass !== confirm) {
      setError('New passwords do not match.');
      return;
    }
    // Mock: any current password is accepted
    setError('');
    setSuccess(true);
  }

  function handleClose() {
    setCurrent('');
    setNewPass('');
    setConfirm('');
    setError('');
    setSuccess(false);
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Backdrop */}
        <TouchableOpacity
          style={StyleSheet.absoluteFillObject}
          onPress={handleClose}
          activeOpacity={1}
        />

        <View style={styles.sheet}>

          {/* Header */}
          <View style={[styles.header, { backgroundColor: accent }]}>
            <Text style={styles.headerTitle}>Change Password</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            {success ? (
              <View style={styles.successState}>
                <View style={[styles.successIcon, { backgroundColor: accent + '18' }]}>
                  <Ionicons name="checkmark-circle" size={48} color={accent} />
                </View>
                <Text style={styles.successTitle}>Password Updated</Text>
                <Text style={styles.successSub}>Your password has been changed successfully.</Text>
                <TouchableOpacity
                  style={[styles.submitBtn, { backgroundColor: accent }]}
                  onPress={handleClose}
                >
                  <Text style={styles.submitBtnText}>Done</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                {error ? (
                  <View style={styles.errorBox}>
                    <Ionicons name="alert-circle-outline" size={16} color={colors.error} />
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                ) : null}

                {/* Current password */}
                <Text style={styles.fieldLabel}>Current Password</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter current password"
                    placeholderTextColor={colors.textMuted}
                    value={current}
                    onChangeText={setCurrent}
                    secureTextEntry={!showCurrent}
                  />
                  <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)}>
                    <Ionicons
                      name={showCurrent ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color={colors.textMuted}
                    />
                  </TouchableOpacity>
                </View>

                {/* New password */}
                <Text style={styles.fieldLabel}>New Password</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter new password"
                    placeholderTextColor={colors.textMuted}
                    value={newPass}
                    onChangeText={setNewPass}
                    secureTextEntry={!showNew}
                  />
                  <TouchableOpacity onPress={() => setShowNew(!showNew)}>
                    <Ionicons
                      name={showNew ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color={colors.textMuted}
                    />
                  </TouchableOpacity>
                </View>

                {/* Confirm new password */}
                <Text style={styles.fieldLabel}>Confirm New Password</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.input}
                    placeholder="Re-enter new password"
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

                <TouchableOpacity
                  style={[styles.submitBtn, { backgroundColor: accent }]}
                  onPress={handleSubmit}
                  activeOpacity={0.8}
                >
                  <Text style={styles.submitBtnText}>Update Password</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: 'rgba(0,0,0,0.45)' },
  sheet: {
    backgroundColor: colors.background,
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: { fontSize: typography.size.lg, fontWeight: typography.weight.bold, color: '#fff' },
  closeBtn: {
    padding: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 9999,
  },
  body: { padding: 20, gap: 8, paddingBottom: 36 },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.errorLight,
    borderRadius: 8,
    padding: 10,
    marginBottom: 4,
  },
  errorText: { fontSize: typography.size.sm, color: colors.error, flex: 1 },
  fieldLabel: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.textSecondary,
    marginTop: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: typography.size.base,
    color: colors.textPrimary,
  },
  submitBtn: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitBtnText: { color: '#fff', fontSize: typography.size.base, fontWeight: typography.weight.bold },
  successState: { alignItems: 'center', gap: 12, paddingVertical: 16 },
  successIcon: { width: 80, height: 80, borderRadius: 9999, justifyContent: 'center', alignItems: 'center' },
  successTitle: { fontSize: typography.size.lg, fontWeight: typography.weight.bold, color: colors.textPrimary },
  successSub: { fontSize: typography.size.sm, color: colors.textSecondary, textAlign: 'center' },
});
