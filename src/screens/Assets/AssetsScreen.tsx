import React, { useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView, TouchableOpacity, Text, ActivityIndicator, ScrollView } from 'react-native';
import { Search, Plus } from 'lucide-react-native';
import firestore from '@react-native-firebase/firestore';
import { Card } from '../../components/Card/Card';
import { Input } from '../../components/Input/Input';
import { ListItem } from '../../components/ListItem/ListItem';
import { colors } from '../../constants/theme';
import { getRelativeVerificationTime } from '../../utils/dateUtils';
import { styles } from './styles';

export const AssetsScreen = ({ navigation, route }: any) => {
  const [assets, setAssets] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    if (route.params?.initialFilter) {
      setCategoryFilter(route.params.initialFilter);
    }
    if (route.params?.searchQuery) {
      setSearchQuery(route.params.searchQuery);
    }
  }, [route.params?.initialFilter, route.params?.searchQuery]);

  useEffect(() => {
    const unsubscribeAssets = firestore()
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

    const unsubscribeAssignments = firestore()
      .collection('assignments')
      .where('status', '==', 'active')
      .onSnapshot(snap => {
        if (snap && !snap.empty) {
          const assigns = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setAssignments(assigns);
        } else {
          setAssignments([]);
        }
      });

    return () => {
      unsubscribeAssets();
      unsubscribeAssignments();
    };
  }, []);

  const filteredAssets = assets.filter(asset => {
    const query = searchQuery.toLowerCase().trim();
    const tagMatch = (asset.assetTag || '').toLowerCase().includes(query);
    const modelMatch = (asset.properties?.brandModel || asset.properties?.accessoryType || '').toLowerCase().includes(query);
    const assignInfo = assignments.find(a => a.assetId === asset.id);
    const empMatch = (assignInfo?.employeeName || '').toLowerCase().includes(query);
    const searchMatch = tagMatch || modelMatch || empMatch;

    // Category / Status Filter
    const cleanFilter = categoryFilter.toLowerCase();
    let filterMatch = true;
    if (cleanFilter === 'all') filterMatch = true;
    else if (cleanFilter === 'available') filterMatch = asset.isAvailable;
    else if (cleanFilter === 'assigned') filterMatch = !asset.isAvailable;
    else if (cleanFilter === 'repair') filterMatch = (asset.status || '').toLowerCase() === 'repair';
    else if (cleanFilter === 'lost') filterMatch = (asset.status || '').toLowerCase() === 'lost';
    else if (cleanFilter === 'laptop') filterMatch = (asset.type || '').toLowerCase() === 'laptop' || (asset.category || '').toLowerCase() === 'laptop';
    else if (cleanFilter === 'mobile') filterMatch = (asset.type || '').toLowerCase() === 'mobile' || (asset.category || '').toLowerCase() === 'mobile';
    else if (cleanFilter === 'accessory') {
      const type = (asset.type || '').toLowerCase();
      const category = (asset.category || '').toLowerCase();
      filterMatch = type === 'accessory' || type === 'hardware' || category === 'accessory' || category === 'hardware';
    }

    return searchMatch && filterMatch;
  });

  const counts = React.useMemo(() => ({
    all: assets.length,
    available: assets.filter(a => a.isAvailable).length,
    assigned: assets.filter(a => !a.isAvailable).length,
    repair: assets.filter(a => (a.status || '').toLowerCase() === 'repair').length,
    lost: assets.filter(a => (a.status || '').toLowerCase() === 'lost').length,
    laptop: assets.filter(a => (a.type || '').toLowerCase() === 'laptop' || (a.category || '').toLowerCase() === 'laptop').length,
    mobile: assets.filter(a => (a.type || '').toLowerCase() === 'mobile' || (a.category || '').toLowerCase() === 'mobile').length,
    accessory: assets.filter(a => {
      const type = (a.type || '').toLowerCase();
      const category = (a.category || '').toLowerCase();
      return type === 'accessory' || type === 'hardware' || category === 'accessory' || category === 'hardware';
    }).length,
  }), [assets]);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'good': return { bg: { backgroundColor: colors.success + '15' }, text: colors.success };
      case 'bad': return { bg: { backgroundColor: colors.error + '15' }, text: colors.error };
      case 'repair': return { bg: { backgroundColor: colors.secondary + '15' }, text: colors.secondary };
      case 'lost': return { bg: { backgroundColor: colors.warning + '15' }, text: colors.warning };
      default: return { bg: { backgroundColor: colors.success + '15' }, text: colors.success };
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    const model = item.properties?.brandModel || item.properties?.accessoryType || 'Unknown Model';
    const tag = item.assetTag || 'NO-TAG';
    const { bg, text } = getStatusColor(item.status);

    let assignmentText = 'Status: Available';
    if (!item.isAvailable) {
      const activeAssign = assignments.find(a => a.assetId === item.id);
      if (activeAssign && activeAssign.employeeName) {
        assignmentText = `Assigned to: ${activeAssign.employeeName}`;
      } else {
        assignmentText = `Status: Assigned`;
      }
    }

    const verification = getRelativeVerificationTime(item.lastCheckedDate);
    const verifiedText = item.lastCheckedDate 
      ? `Verified: ${verification.text}` 
      : 'VERIFICATION NEEDED';

    return (
      <ListItem
        title={`${tag} - ${model}`}
        subtitle={[
          `Type: ${(item.type || 'Unknown').toUpperCase()}`,
          assignmentText,
          verifiedText
        ]}
        rightElement={
          <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
            <View style={[styles.statusBadge, bg]}>
              <Text style={[styles.statusText, { color: text }]}>{item.status || 'Good'}</Text>
            </View>
            {verification.needsVerification && (
              <Text style={{ color: colors.error, fontSize: 10, marginTop: 4, fontWeight: 'bold' }}>
                NEED TO VERIFY
              </Text>
            )}
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
          containerStyle={{ marginBottom: 12 }}
        />

       <View>
         <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContentContainer}
        >
          {[
            { label: 'All', count: counts.all },
            { label: 'Available', count: counts.available },
            { label: 'Assigned', count: counts.assigned },
            { label: 'Repair', count: counts.repair },
            { label: 'Lost', count: counts.lost },
            { label: 'Laptop', count: counts.laptop },
            { label: 'Mobile', count: counts.mobile },
            { label: 'Accessory', count: counts.accessory },
          ].map((item) => (
            <TouchableOpacity 
              key={item.label}
              style={[styles.chip, categoryFilter === item.label && styles.chipSelected]}
              onPress={() => setCategoryFilter(item.label)}
            >
              <Text style={[styles.chipText, categoryFilter === item.label && styles.chipTextSelected]}>
                {item.label} ({item.count})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
       </View>

        <View style={styles.statsRow}>
          <Card style={styles.statsCard}>
            <Text style={styles.statsValue}>{assets.length}</Text>
            <Text style={styles.statsLabel}>Total</Text>
          </Card>
          <Card style={[styles.statsCard, { borderColor: colors.success + '40', borderWidth: 1 }]}>
            <Text style={[styles.statsValue, { color: colors.success }]}>{assets.filter(a => a.isAvailable).length}</Text>
            <Text style={styles.statsLabel}>Available</Text>
          </Card>
          <Card style={[styles.statsCard, { borderColor: colors.error + '40', borderWidth: 1 }]}>
            <Text style={[styles.statsValue, { color: colors.error }]}>{assets.filter(a => a.status === 'Repair' || a.status === 'Bad').length}</Text>
            <Text style={styles.statsLabel}>Maintenance</Text>
          </Card>
        </View>
        
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={filteredAssets}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            style={{ flex: 1 }}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Search size={48} color={colors.border} />
                <Text style={styles.emptyTitle}>No Assets Found</Text>
                <Text style={styles.emptyText}>
                  We couldn't find any assets matching "{searchQuery}". Try a different tag or model.
                </Text>
              </View>
            }
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
          />
        )}

        {/* Floating Action Button */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddEditAsset')}
        >
          <Plus size={30} color={colors.surface} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
