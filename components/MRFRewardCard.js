import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function MRFRewardCard({ reward }) {
  const outOfStock = reward.stock === 0;

  return (
    <View style={styles.card}>
      <View style={[styles.imagePlaceholder, { backgroundColor: reward.placeholderColor }]}>
        <Text style={styles.partnerInitial}>{reward.partner[0]}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.name} numberOfLines={2}>{reward.name}</Text>
        <View style={styles.costRow}>
          <Ionicons name="diamond" size={12} color={colors.primary} />
          <Text style={styles.cost}>{reward.tokenCost.toLocaleString()} ECO</Text>
        </View>
        <View style={[styles.stockTag, outOfStock && styles.stockTagEmpty]}>
          <Ionicons
            name={outOfStock ? 'close-circle-outline' : 'cube-outline'}
            size={11}
            color={outOfStock ? colors.error : colors.primary}
          />
          <Text style={[styles.stockText, outOfStock && styles.stockTextEmpty]}>
            {outOfStock ? 'Out of stock' : `${reward.stock} in stock`}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.secondary,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  imagePlaceholder: { height: 80, justifyContent: 'center', alignItems: 'center' },
  partnerInitial: {
    fontSize: typography.size.xxl,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
    opacity: 0.3,
  },
  cardBody: { padding: 10, gap: 6 },
  name: { fontSize: typography.size.sm, fontWeight: typography.weight.semibold, color: colors.textPrimary },
  costRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  cost: { fontSize: typography.size.xs, color: colors.primary, fontWeight: typography.weight.medium },
  stockTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.successLight,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 6,
    alignSelf: 'flex-start',
  },
  stockTagEmpty: {
    backgroundColor: colors.errorLight,
  },
  stockText: {
    fontSize: typography.size.xs,
    color: colors.primary,
    fontWeight: typography.weight.semibold,
  },
  stockTextEmpty: {
    color: colors.error,
  },
});
