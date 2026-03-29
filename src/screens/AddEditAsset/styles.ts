import { StyleSheet, Platform } from 'react-native';
import { colors, spacing, borderRadius } from '../../constants/theme';

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: spacing.m, backgroundColor: colors.surface,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  backButton: { padding: spacing.s },
  backButtonText: { color: colors.primary, fontSize: 16, fontWeight: '600' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: colors.text },
  keyboardView: { flex: 1 },
  container: { padding: spacing.m, paddingBottom: spacing.xl * 3 },
  footer: {
    flexDirection: 'row', justifyContent: 'space-between',
    padding: spacing.m, backgroundColor: colors.surface,
    borderTopWidth: 1, borderTopColor: colors.border,
    paddingBottom: Platform.OS === 'ios' ? spacing.xl : spacing.m,
  },
  footerButton: { flex: 0.48 },
  statusContainer: { marginTop: spacing.m, marginBottom: spacing.l },
  statusLabel: { fontSize: 14, color: colors.textLight, marginBottom: spacing.s },
  statusOptions: { flexDirection: 'row', gap: spacing.s },
  statusOption: {
    flex: 1, paddingVertical: spacing.s,
    borderWidth: 1, borderColor: colors.border,
    borderRadius: borderRadius.s, alignItems: 'center',
  },
  statusOptionSelected: {
    backgroundColor: colors.primary, borderColor: colors.primary,
  },
  statusOptionText: { fontSize: 14, color: colors.text, fontWeight: '500' },
  statusOptionTextSelected: { color: colors.surface },
  typeScrollView: {
    paddingVertical: spacing.s,
    marginBottom: spacing.l,
  },
  typeOption: {
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.s,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.m,
  },
  typeOptionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeOptionText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  typeOptionTextSelected: {
    color: colors.surface,
  },
});
