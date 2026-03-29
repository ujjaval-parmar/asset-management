import { StyleSheet, Platform } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.m,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  backButton: {
    padding: spacing.xs,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: 16,
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    padding: spacing.m,
  },
  statusContainer: {
    marginBottom: spacing.l,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  statusOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusOption: {
    flex: 1,
    paddingVertical: spacing.m,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.m,
    alignItems: 'center',
    marginHorizontal: spacing.xs,
    backgroundColor: colors.surface,
  },
  statusOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  statusOptionText: {
    fontSize: 16,
    color: colors.textLight,
    fontWeight: '500',
  },
  statusOptionTextSelected: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.m,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: Platform.OS === 'ios' ? spacing.xl : spacing.m,
  },
  footerButton: {
    width: '48%',
  },
});
