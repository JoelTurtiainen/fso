import { Image, StyleSheet, View } from 'react-native';
import theme from '../../theme';
import Stat from './Stat';
import Header from './Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

const RepositoryItem = ({ data }) => (
  <View style={styles.container}>
    <Header data={data} />
    <View style={styles.stats}>
      <Stat label={'Stars'} count={data.stargazersCount} />
      <Stat label={'Forks'} count={data.forksCount} />
      <Stat label={'Reviews'} count={data.reviewCount} />
      <Stat label={'Rating'} count={data.ratingAverage} />
    </View>
  </View>
);

export default RepositoryItem;
