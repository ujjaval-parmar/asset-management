import { StyleSheet } from 'react-native';
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
  editButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  container: {
    padding: spacing.m,
  },
  infoCard: {
    marginBottom: spacing.l,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  employeeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  employeeDate: {
    fontSize: 13,
    color: colors.textLight,
  },
  statusBadge: {
    paddingHorizontal: spacing.s,
    paddingVertical: 4,
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
    fontWeight: 'bold',
    color: colors.text,
  },
  actionButton: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.m,
  },
  assetCard: {
    marginBottom: spacing.m,
  },
  assetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  assetTag: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
  },
  assetStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: spacing.s,
    paddingVertical: 2,
    borderRadius: borderRadius.s,
    overflow: 'hidden',
  },
  assetStatusGood: {
    backgroundColor: colors.success + '20',
    color: colors.success,
  },
  assetStatusRepair: {
    backgroundColor: colors.warning + '20',
    color: colors.warning,
  },
  assetModel: {
    fontSize: 15,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  assetType: {
    fontSize: 13,
    color: colors.textLight,
  },
  historyContainer: {
    marginTop: spacing.l,
    marginBottom: spacing.xl,
  },
  historyItem: {
    backgroundColor: 'transparent',
    padding: 0,
    elevation: 0,
    shadowOpacity: 0,
    marginBottom: spacing.m,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.m,
    borderTopRightRadius: borderRadius.m,
    padding: spacing.l,
    paddingBottom: spacing.xl * 2,
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.l,
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: spacing.m,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    alignItems: 'center',
  },
  modalOptionText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  modalCancelText: {
    fontSize: 16,
    color: colors.error,
    fontWeight: 'bold',
    marginTop: spacing.xl,
    textAlign: 'center',
  },
});
