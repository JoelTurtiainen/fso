import { Text, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#d9d9d9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    fontSize: 1,
    borderRadius: 10,
  },
  title: {
    fontWeight: 700,
    fontSize: 16,
  },
  description: {
    fontStyle: 'italic',
    fontWeight: 300,
    fontSize: 14,
  },
});

const RepositoryItem = ({ data }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{data.fullName}</Text>
    <Text style={styles.description}>{data.description}</Text>
    <Text>{data.language}</Text>
    <Text>Stars: {data.stargazersCount}</Text>
    <Text>Forks: {data.forksCount}</Text>
    <Text>Reviews: {data.reviewCount}</Text>
    <Text>Rating: {data.ratingAverage}</Text>
  </View>
);

export default RepositoryItem;
