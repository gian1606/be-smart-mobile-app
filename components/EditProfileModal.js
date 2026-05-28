import { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Modal, StyleSheet, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function EditProfileModal({ visible, onClose, fields, accentColor }) {
  const accent = accentColor || colors.primary;

  const [values, setValues] = useState({});
  const [success, setSuccess] = useState(false);

  // Sync field values whenever the modal opens
  useEffect(() => {
    if (visible) {
      setValues(Object.fromEntries(fields.map((f) => [f.label, f.value])));
      setSuccess(false);
    }
  }, [visible]);

  function handleChange(label, text) {
    setValues((prev) => ({ ...prev, [label]: text }));
  }

  function handleSave() {
    setSuccess(true);
  }

  function handleClose() {
    setSuccess(false);
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Backdrop — behind the card */}
        <TouchableOpacity
          style={StyleSheet.absoluteFillObject}
          onPress={handleClose}
          activeOpacity={1}
        />

        {/* Card — must not propagate taps to backdrop */}
        <View style={styles.card}>

          {/* Header */}
          <View style={[styles.header, { backgroundColor: accent }]}>
            <Text style={styles.headerTitle}>Edit Personal Information</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {success ? (
            <View style={styles.successState}>
              <View style={[styles.successIcon, { backgroundColor: accent + '18' }]}>
                <Ionicons name="checkmark-circle" size={48} color={accent} />
              </View>
              <Text style={styles.successTitle}>Profile Updated</Text>
              <Text style={styles.successSub}>Your information has been saved successfully.</Text>
              <TouchableOpacity
                style={[styles.saveBtn, { backgroundColor: accent }]}
                onPress={handleClose}
              >
                <Text style={styles.saveBtnText}>Done</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={styles.body}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {fields.map((field) => (
                <View key={field.label} style={styles.fieldGroup}>
                  <Text style={styles.fieldLabel}>{field.label}</Text>
                  <View style={styles.inputRow}>
                    <Ionicons name={field.icon} size={18} color={colors.textMuted} />
                    <TextInput
                      style={styles.input}
                      value={values[field.label] ?? ''}
                      onChangeText={(text) => handleChange(field.label, text)}
                      keyboardType={field.keyboardType || 'default'}
                      autoCapitalize={field.keyboardType === 'email-address' ? 'none' : 'words'}
                      placeholderTextColor={colors.textMuted}
                    />
                  </View>
                </View>
              ))}

              <TouchableOpacity
                style={[styles.saveBtn, { backgroundColor: accent }]}
                onPress={handleSave}
                activeOpacity={0.8}
              >
                <Text style={styles.saveBtnText}>Save Changes</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
    maxHeight: '85%',
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
  body: { padding: 20, gap: 14, paddingBottom: 8 },
  fieldGroup: { gap: 6 },
  fieldLabel: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.textSecondary,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
  saveBtn: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
    elevation: 4,
    width: '100%',
  },
  saveBtnText: { color: '#fff', fontSize: typography.size.base, fontWeight: typography.weight.bold },
  successState: { alignItems: 'center', gap: 12, padding: 28, width: '100%' },
  successIcon: { width: 80, height: 80, borderRadius: 9999, justifyContent: 'center', alignItems: 'center' },
  successTitle: { fontSize: typography.size.lg, fontWeight: typography.weight.bold, color: colors.textPrimary },
  successSub: { fontSize: typography.size.sm, color: colors.textSecondary, textAlign: 'center' },
});
