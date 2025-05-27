import { StyleSheet, View } from 'react-native';
import theme from '../../theme';
import Header from './Header';
import Stats from './Stats';

const RepositoryItem = ({ data }) => (
  <View testID="repositoryItem" style={styles.container}>
    <Header data={data} />
    <Stats data={data} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
  },
});

export default RepositoryItem;
