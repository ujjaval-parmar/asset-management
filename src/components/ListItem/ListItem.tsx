import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../../constants/theme';

interface ListItemProps {
  title: string;
  subtitle?: string | string[];
  rightElement?: React.ReactNode;
  onPress?: () => void;
  style?: object;
}

export const ListItem: React.FC<ListItemProps> = ({ title, subtitle, rightElement, onPress, style }) => {
  const renderSubtitle = () => {
    if (!subtitle) return null;
    if (Array.isArray(subtitle)) {
      return (
        <View style={styles.subtitleContainer}>
          {subtitle.map((line, index) => (
            <Text key={index} style={styles.subtitle} numberOfLines={1}>
              {line}
            </Text>
          ))}
        </View>
      );
    }
    return <Text style={styles.subtitle} numberOfLines={4}>{subtitle}</Text>;
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        {renderSubtitle()}
      </View>
      {rightElement && (
        <View style={styles.rightContainer}>
          {rightElement}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.m,
    borderRadius: borderRadius.m,
    marginBottom: spacing.m,
    ...shadows.small,
  },
  content: {
    flex: 1,
    marginRight: spacing.m,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitleContainer: {
    marginTop: 2,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textLight,
    marginBottom: 2,
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
