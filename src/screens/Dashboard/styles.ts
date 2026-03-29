import { StyleSheet, Platform } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: spacing.m,
    paddingTop: Platform.OS === 'android' ? spacing.xl : spacing.m,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.l,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.m,
  },
  summaryCard: {
    width: '48%',
    marginBottom: spacing.m,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textLight,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.m,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  actionButton: {
    width: '48%',
  },
  activityList: {
    marginBottom: spacing.xl,
  },
  insightCard: {
    marginBottom: spacing.xl,
  },
  insightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  lastInsightRow: {
    borderBottomWidth: 0,
  },
  insightLabel: {
    fontSize: 16,
    color: colors.text,
  },
  insightValueError: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.error,
  },
  insightValueWarning: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.warning,
  },
});
