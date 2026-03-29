import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../../constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: spacing.m,
  },
  searchInput: {
    marginBottom: spacing.m,
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
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.m,
    backgroundColor: colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.medium,
  },
  fabIcon: {
    fontSize: 32,
    color: colors.surface,
    lineHeight: 34,
  },
});
