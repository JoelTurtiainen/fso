import { View, StyleSheet } from 'react-native';
import Stat from './Stat';

const Stats = ({ data }) => (
  <View style={styles.stats}>
    <Stat label={'Stars'} count={data.stargazersCount} />
    <Stat label={'Forks'} count={data.forksCount} />
    <Stat label={'Reviews'} count={data.reviewCount} />
    <Stat label={'Rating'} count={data.ratingAverage} />
  </View>
);

const styles = StyleSheet.create({
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default Stats;
