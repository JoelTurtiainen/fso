import { StyleSheet, View } from 'react-native';
import theme from '../../theme';
import Header from './Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
  },
});

const RepositoryItem = ({ data }) => (
  <View style={styles.container}>
    <Header data={data} />
  </View>
);

export default RepositoryItem;
