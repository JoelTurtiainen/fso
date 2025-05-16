import { View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';
import { ScrollView } from 'react-native';

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" style={styles.link}>
          <Text fontWeight="bold" color="bgPrimary">
            Repositories
          </Text>
        </Link>
        <Link to="/signin" style={styles.link}>
          <Text fontWeight="bold" color="bgPrimary">
            Sign in
          </Text>
        </Link>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    padding: 5,
  },
  link: {
    padding: 10,
  },
});

export default AppBar;
