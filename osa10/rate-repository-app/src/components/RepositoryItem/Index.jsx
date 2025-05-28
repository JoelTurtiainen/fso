import { StyleSheet, View } from 'react-native';
import theme from '../../theme';
import Header from './Header';
import Stats from './Stats';
import RepoLink from './RepoLink';

const RepositoryItem = ({ data, showLink = false }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <Header data={data} />
      <Stats data={data} />
      {showLink && <RepoLink url={data.url} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
  },
});

export default RepositoryItem;
