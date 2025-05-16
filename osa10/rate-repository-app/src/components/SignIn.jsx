import { Pressable, StyleSheet, View, TextInput } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import theme from '../theme';

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={formik.handleChange('username')}
        value={formik.values.firstName}
        placeholder="Username"
      />
      <TextInput
        secureTextEntry
        style={styles.input}
        onChangeText={formik.handleChange('password')}
        value={formik.values.firstName}
        placeholder="Password"
      />
      <Pressable style={[styles.input, styles.button]} onPress={formik.handleSubmit}>
        <Text fontWeight="bold" color="bgPrimary">
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundPrimary,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  input: {
    height: 45,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    borderWidth: 0,
  },
});

export default SignIn;
