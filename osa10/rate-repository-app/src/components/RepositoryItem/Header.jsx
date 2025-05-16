import { Image, StyleSheet, View } from 'react-native';
import Text from '../Text';
import theme from '../../theme';

const Header = ({ data }) => (
  <View style={styles.container}>
    <View>
      <Image style={styles.logo} source={{ uri: data.ownerAvatarUrl }} />
    </View>

    <View style={styles.item}>
      <View>
        <Text fontWeight="bold" fontSize="subheading">
          {data.fullName}
        </Text>
      </View>

      <View>
        <Text color="textSecondary">{data.description}</Text>
      </View>

      <View style={styles.language}>
        <Text style={styles.language}>{data.language}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
  },
  item: {
    flexDirection: 'column',
    gap: 5,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  logo: {
    width: 50,
    height: 50,
  },
  language: {
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    color: 'white',
    paddingBlock: 2,
    paddingInline: 3,
    borderRadius: 3,
  },
});

export default Header;
