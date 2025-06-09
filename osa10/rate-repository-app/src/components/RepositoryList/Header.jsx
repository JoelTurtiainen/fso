import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import theme from '../../theme';

const RepositoryListHeader = ({
  sortQuery,
  setSortQuery,
  searchQuery,
  setSearchQuery,
}) => (
  <>
    <Searchbar
      style={styles.searchBar}
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
    <Picker
      style={styles.picker}
      selectedValue={sortQuery}
      onValueChange={(itemValue, itemIndex) => setSortQuery(itemValue)}
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="ratingDesc" />
      <Picker.Item label="Lowest rated repositories" value="ratingAsc" />
    </Picker>
  </>
);

const styles = StyleSheet.create({
  searchBar: {
    borderRadius: 10,
    margin: 10,
    marginBottom: 0,
  },
  picker: {
    marginHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: theme.colors.backgroundSecondary,
  },
});

export default RepositoryListHeader;
