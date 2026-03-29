import React, { useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Input } from '../../components/Input/Input';
import { ListItem } from '../../components/ListItem/ListItem';
import { colors } from '../../constants/theme';
import { styles } from './styles';

export const AssetsScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('assets')
      .onSnapshot((querySnapshot) => {
        const assetList: any[] = [];
        if (querySnapshot) {
          querySnapshot.forEach(doc => {
            assetList.push({
              ...doc.data(),
              id: doc.id,
            });
          });
        }
        setAssets(assetList);
        setLoading(false);
      }, (error) => {
        console.error("Error fetching assets: ", error);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  const filteredAssets = assets.filter(asset => {
    const query = searchQuery.toLowerCase();
    const tagMatch = (asset.assetTag || '').toLowerCase().includes(query);
    const modelMatch = (asset.properties?.brandModel || asset.properties?.accessoryType || '').toLowerCase().includes(query);
    return tagMatch || modelMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'good': return { bg: { backgroundColor: '#E8F5E9' }, text: '#2E7D32' };
      case 'bad': return { bg: { backgroundColor: '#FFEBEE' }, text: '#C62828' };
      case 'repair': return { bg: { backgroundColor: '#FFF3E0' }, text: '#EF6C00' };
      case 'lost': return { bg: { backgroundColor: '#EEEEEE' }, text: '#616161' };
      default: return { bg: { backgroundColor: '#E8F5E9' }, text: '#2E7D32' };
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    const model = item.properties?.brandModel || item.properties?.accessoryType || 'Unknown Model';
    const tag = item.assetTag || 'NO-TAG';
    const { bg, text } = getStatusColor(item.status);

    return (
      <ListItem
        title={`${tag} - ${model}`}
        subtitle={`Type: ${(item.type || 'Unknown').toUpperCase()} • ${item.isAvailable ? 'Available' : 'Assigned'}`}
        rightElement={
          <View style={[styles.statusBadge, bg]}>
            <Text style={[styles.statusText, { color: text }]}>{item.status || 'Good'}</Text>
          </View>
        }
        onPress={() => navigation.navigate('AssetDetails', { assetId: item.id })}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Assets Directory</Text>
        
        <Input
          placeholder="Search by tag or model..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={filteredAssets}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
          />
        )}

        {/* Floating Action Button */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddEditAsset')}
          activeOpacity={0.8}
        >
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
