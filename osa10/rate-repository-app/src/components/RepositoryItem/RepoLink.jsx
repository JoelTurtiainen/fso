import { Linking, Pressable, StyleSheet } from 'react-native';
import Text from '../Text';
import theme from '../../theme';

const RepoLink = ({ url }) => {
  return (
    <Pressable onPress={() => Linking.openURL(url)} style={styles.button}>
      <Text color={'bgPrimary'}>Open In Github</Text>
    </Pressable>
  );
};

export default RepoLink;

const styles = StyleSheet.create({
  button: {
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    borderWidth: 0,
  },
});
