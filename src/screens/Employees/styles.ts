import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../../constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
    justifyContent: 'flex-start',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.m,
  },
  searchInput: {
    // Layout handled by containerStyle
  },
  filterContainer: {
    marginBottom: 8,
  },
  filterContentContainer: {
    paddingRight: 20,
    paddingVertical: 4,
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 11,
    color: colors.text,
    fontWeight: '600',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  chipTextSelected: {
    color: colors.surface,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statsCard: {
    flex: 1,
    padding: spacing.s,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  statsValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  statsLabel: {
    fontSize: 10,
    color: colors.textLight,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  listContainer: {
    paddingBottom: 80, // For FAB
  },
  statusBadge: {
    paddingHorizontal: spacing.s,
    paddingVertical: 2,
    borderRadius: borderRadius.s,
  },
  statusActive: {
    backgroundColor: colors.success + '20',
  },
  statusInactive: {
    backgroundColor: colors.error + '20',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text,
  },
  fab: {
    position: 'absolute',
    right: spacing.l,
    bottom: spacing.l,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.medium,
  },
  fabText: {
    fontSize: 24,
    color: colors.surface,
  },
  emptyContainer: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: spacing.m,
  },
  emptyText: {
    fontSize: 13,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: spacing.s,
    paddingHorizontal: spacing.xl,
  },
});
