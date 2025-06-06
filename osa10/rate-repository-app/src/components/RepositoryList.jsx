import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem/Index';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import theme from '../theme';
import { Picker } from '@react-native-picker/picker';

const variables = {
  latest: {
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  },
  ratingDesc: {
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
  },
  ratingAsc: {
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
  },
};

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, header = <></> }) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(item.id)}>
          <RepositoryItem data={item} />
        </Pressable>
      )}
      ListHeaderComponent={header}
    />
  );
};

const OrderByPicker = ({ selectedValue, setSelectedValue }) => (
  <Picker
    style={styles.picker}
    selectedValue={selectedValue}
    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
  >
    <Picker.Item label="Latest repositories" value="latest" />
    <Picker.Item label="Highest rated repositories" value="ratingDesc" />
    <Picker.Item label="Lowest rated repositories" value="ratingAsc" />
  </Picker>
);

const RepositoryList = () => {
  const [selectedValue, setSelectedValue] = useState('latest');
  const { repositories } = useRepositories(variables[selectedValue]);

  const header = (
    <OrderByPicker
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
    />
  );

  return (
    <RepositoryListContainer repositories={repositories} header={header} />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    marginHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: theme.colors.backgroundSecondary,
  },
});

export default RepositoryList;
