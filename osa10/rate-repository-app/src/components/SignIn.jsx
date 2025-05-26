import { Pressable, StyleSheet, View, TextInput } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must be greater or equal to 3')
    .required('Username is a required field'),
  password: yup
    .string()
    .min(8, 'Password must be greater or equal to 8')
    .required('Password is a required field'),
});

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const isInvalid = (key) =>
    Boolean(formik?.touched[key] && formik?.errors[key]);

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, isInvalid('username') && styles.errorBorder]}
        onChangeText={formik.handleChange('username')}
        value={formik.values.firstName}
        placeholder="Username"
      />
      {isInvalid('username') && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}
      <TextInput
        secureTextEntry
        style={[styles.input, isInvalid('password') && styles.errorBorder]}
        onChangeText={formik.handleChange('password')}
        value={formik.values.firstName}
        placeholder="Password"
      />
      {isInvalid('password') && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}
      <Pressable
        style={[styles.input, styles.button]}
        onPress={formik.handleSubmit}
      >
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
  errorBorder: {
    borderColor: theme.colors.error,
  },
  error: {
    color: theme.colors.error,
    marginHorizontal: 10,
    padding: 3,
  },
});

export default SignIn;
