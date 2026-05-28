import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { mockRewards } from '../../mock/data';
import CategoryPill from '../../components/CategoryPill';
import MRFRewardCard from '../../components/MRFRewardCard';

const CATEGORIES = ['All', 'Food', 'Shopping', 'Services', 'Utilities'];

export default function RewardsScreen() {
  const [activeCategory, setActiveCategory] = useState('All');

  const featured = mockRewards.find((r) => r.featured);
  const filtered = mockRewards.filter(
    (r) => !r.featured && (activeCategory === 'All' || r.category === activeCategory)
  );

  return (
    <View style={styles.screen}>

      {/* Colored header */}
      <View style={styles.header}>
        <Text style={styles.title}>Eco Rewards Catalog</Text>
        <Text style={styles.subtitle}>Rewards available for residents to claim</Text>
      </View>

    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>

      {/* Category filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {CATEGORIES.map((cat) => (
          <CategoryPill
            key={cat}
            label={cat}
            isActive={activeCategory === cat}
            onPress={() => setActiveCategory(cat)}
          />
        ))}
      </ScrollView>

      {/* Featured banner */}
      {featured && (
        <View style={styles.featuredCard}>
          <View style={styles.featuredImage}>
            <Ionicons name="star" size={32} color={colors.secondary} />
            <Text style={styles.featuredLabel}>Featured</Text>
          </View>
          <View style={styles.featuredBody}>
            <Text style={styles.featuredName}>{featured.name}</Text>
            <View style={styles.featuredCostRow}>
              <Ionicons name="diamond" size={13} color={colors.primary} />
              <Text style={styles.featuredCost}>{featured.tokenCost.toLocaleString()} ECO</Text>
            </View>
            <View style={[styles.featuredStockRow, featured.stock === 0 && styles.featuredStockRowEmpty]}>
              <Ionicons
                name={featured.stock === 0 ? 'close-circle-outline' : 'cube-outline'}
                size={14}
                color={featured.stock === 0 ? colors.error : colors.primary}
              />
              <Text style={[styles.featuredStockText, featured.stock === 0 && styles.featuredStockTextEmpty]}>
                {featured.stock === 0 ? 'Out of stock' : `${featured.stock} in stock`}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Reward grid */}
      <View style={styles.grid}>
        {filtered.map((reward) => (
          <View key={reward.id} style={styles.gridItem}>
            <MRFRewardCard reward={reward} />
          </View>
        ))}
      </View>

    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 20,
    gap: 4,
  },
  title: { fontSize: typography.size.xl, fontWeight: typography.weight.bold, color: colors.secondary },
  subtitle: { fontSize: typography.size.sm, color: 'rgba(255,255,255,0.75)' },
  scroll: { flex: 1 },
  content: { padding: 20, gap: 18, paddingBottom: 40 },
  featuredCard: { backgroundColor: colors.secondary, borderRadius: 14, overflow: 'hidden', borderWidth: 1, borderColor: colors.cardBorder, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 10, elevation: 3 },
  featuredImage: { height: 100, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', gap: 6 },
  featuredLabel: { color: colors.secondary, fontSize: typography.size.sm, fontWeight: typography.weight.semibold, letterSpacing: 1 },
  featuredBody: { padding: 14, gap: 8 },
  featuredName: { fontSize: typography.size.md, fontWeight: typography.weight.bold, color: colors.textPrimary },
  featuredCostRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  featuredCost: { fontSize: typography.size.sm, color: colors.primary, fontWeight: typography.weight.medium },
  featuredStockRow: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.successLight, borderRadius: 8, paddingVertical: 7, paddingHorizontal: 10, alignSelf: 'flex-start', marginTop: 2 },
  featuredStockRowEmpty: { backgroundColor: colors.errorLight },
  featuredStockText: { fontSize: typography.size.sm, color: colors.primary, fontWeight: typography.weight.semibold },
  featuredStockTextEmpty: { color: colors.error },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  gridItem: { width: '47%' },
});
