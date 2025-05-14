import { StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  item: {
    backgroundColor: theme.colors.backgroundPrimary,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
});

const RepositoryItem = ({ data }) => (
  <View style={styles.item}>
    <Text fontWeight="bold" fontSize="subheading">
      {data.fullName}
    </Text>
    <Text color="textSecondary">{data.description}</Text>
    <Text>{data.language}</Text>
    <Text>Stars: {data.stargazersCount}</Text>
    <Text>Forks: {data.forksCount}</Text>
    <Text>Reviews: {data.reviewCount}</Text>
    <Text>Rating: {data.ratingAverage}</Text>
  </View>
);

export default RepositoryItem;
