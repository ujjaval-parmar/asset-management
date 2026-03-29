import { StyleSheet, Platform } from 'react-native';
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
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.m,
  },
  searchInput: {
    marginBottom: spacing.m,
  },
  listContainer: {
    paddingBottom: spacing.xl * 2,
  },
  statusBadge: {
    paddingHorizontal: spacing.s,
    paddingVertical: 4,
    borderRadius: borderRadius.s,
  },
  statusGood: {
    backgroundColor: '#E8F5E9',
  },
  statusRepair: {
    backgroundColor: '#FFEBEE',
  },
  statusLost: {
    backgroundColor: '#FFF3E0',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.l,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.medium,
    elevation: 5,
  },
  fabIcon: {
    fontSize: 28,
    color: colors.surface,
    fontWeight: '300',
    marginTop: Platform.OS === 'ios' ? -2 : -4,
  },
});
