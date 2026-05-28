import {
  View, Text, TouchableOpacity,
  Modal, FlatList, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

// icon + color per notification type
const TYPE_CONFIG = {
  reward:   { icon: 'diamond-outline',          color: colors.primary   },
  pickup:   { icon: 'trash-outline',            color: '#0D7A5F'        },
  promo:    { icon: 'pricetag-outline',          color: '#6A1B9A'        },
  system:   { icon: 'information-circle-outline',color: colors.textSecondary },
  scan:     { icon: 'qr-code-outline',           color: colors.primary   },
  alert:    { icon: 'alert-circle-outline',      color: colors.error     },
  mrf:      { icon: 'business-outline',          color: colors.error     },
  reserve:  { icon: 'calendar-outline',          color: '#1B5E20'        },
  complete: { icon: 'checkmark-circle-outline',  color: '#0D7A5F'        },
  task:     { icon: 'alert-circle-outline',      color: '#0D7A5F'        },
  schedule: { icon: 'calendar-outline',          color: '#0D7A5F'        },
  report:   { icon: 'document-text-outline',     color: '#0D7A5F'        },
};

function NotifRow({ item }) {
  const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.system;
  return (
    <View style={[styles.row, !item.read && styles.rowUnread]}>
      <View style={[styles.iconWrap, { backgroundColor: cfg.color + '18' }]}>
        <Ionicons name={cfg.icon} size={18} color={cfg.color} />
      </View>
      <View style={styles.body}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemBody}>{item.body}</Text>
        <Text style={styles.itemTime}>{item.time}</Text>
      </View>
      {!item.read && <View style={styles.unreadDot} />}
    </View>
  );
}

export default function NotificationsModal({ visible, onClose, notifications, accentColor }) {
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={[styles.header, { backgroundColor: accentColor }]}>
            <View>
              <Text style={styles.title}>Notifications</Text>
              <Text style={styles.subtitle}>{unread} unread</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={notifications}
            keyExtractor={(n) => n.id}
            renderItem={({ item }) => <NotifRow item={item} />}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.empty}>
                <Ionicons name="notifications-off-outline" size={40} color={colors.textMuted} />
                <Text style={styles.emptyText}>No notifications</Text>
              </View>
            }
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)' },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '78%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title:    { fontSize: typography.size.lg, fontWeight: typography.weight.bold, color: '#fff' },
  subtitle: { fontSize: typography.size.xs, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  closeBtn: {
    padding: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 9999,
  },
  list: { padding: 16, gap: 10, paddingBottom: 32 },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  rowUnread: {
    backgroundColor: colors.successLight,
    borderColor: '#A5D6A7',
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  body:      { flex: 1, gap: 3 },
  itemTitle: { fontSize: typography.size.sm, fontWeight: typography.weight.bold, color: colors.textPrimary },
  itemBody:  { fontSize: typography.size.xs, color: colors.textSecondary, lineHeight: 16 },
  itemTime:  { fontSize: typography.size.xs, color: colors.textMuted, marginTop: 2 },
  unreadDot: { width: 8, height: 8, borderRadius: 9999, backgroundColor: colors.accent, marginTop: 4, flexShrink: 0 },
  empty:     { alignItems: 'center', paddingTop: 40, gap: 12 },
  emptyText: { fontSize: typography.size.base, color: colors.textMuted },
});
