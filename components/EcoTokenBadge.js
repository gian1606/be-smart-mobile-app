import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function EcoTokenBadge({ balance, onViewRewards, variant = 'card' }) {
  if (variant === 'pill') {
    return (
      <View style={styles.pill}>
        <View style={styles.pillIcon}>
          <Ionicons name="diamond" size={11} color={colors.primary} />
        </View>
        <Text style={styles.pillText}>{balance.toLocaleString()} ECO</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <View style={styles.tokenIcon}>
          <Ionicons name="diamond" size={20} color="#fff" />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardLabel}>ECO Balance</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.cardBalance}>{balance.toLocaleString()}</Text>
            <Text style={styles.cardSymbol}>ECO</Text>
          </View>
        </View>
      </View>
      {onViewRewards && (
        <TouchableOpacity onPress={onViewRewards} activeOpacity={0.7} style={styles.rewardsBtn}>
          <Text style={styles.cardLink}>Rewards</Text>
          <Ionicons name="chevron-forward" size={13} color={colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  pillIcon: {
    width: 20,
    height: 20,
    borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillText: {
    color: '#fff',
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    letterSpacing: 0.3,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.secondary,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tokenIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: {
    gap: 2,
  },
  cardLabel: {
    fontSize: typography.size.xs,
    color: colors.textSecondary,
    fontWeight: typography.weight.medium,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 5,
  },
  cardBalance: {
    fontSize: typography.size.xl,
    color: colors.textPrimary,
    fontWeight: typography.weight.bold,
  },
  cardSymbol: {
    fontSize: typography.size.sm,
    color: colors.primary,
    fontWeight: typography.weight.bold,
  },
  rewardsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: colors.successLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  cardLink: {
    fontSize: typography.size.sm,
    color: colors.primary,
    fontWeight: typography.weight.semibold,
  },
});
