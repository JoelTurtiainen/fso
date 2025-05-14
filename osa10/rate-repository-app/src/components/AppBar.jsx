import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    padding: 12,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Text fontWeight="bold" color="bgPrimary">
        Repositories
      </Text>
    </View>
  );
};

export default AppBar;
