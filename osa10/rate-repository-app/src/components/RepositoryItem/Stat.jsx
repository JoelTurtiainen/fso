import { StyleSheet, View } from 'react-native';
import Text from '../Text';
import { approx } from '../../utils/utils';

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
  },
});

const Stat = ({ label, count }) => (
  <View style={styles.item}>
    <Text fontWeight="bold">{approx(count)}</Text>
    <Text color={'textSecondary'}>{label}</Text>
  </View>
);

export default Stat;
