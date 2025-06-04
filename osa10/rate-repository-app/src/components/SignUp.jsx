import * as yup from 'yup';
import { Pressable, StyleSheet, View, TextInput } from 'react-native';
import { useFormik } from 'formik';

import Text from './Text';
import theme from '../theme';
import useSignUp from '../hooks/useSignUp';
import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username length must be atleast 5')
    .max(30, 'Username length must not exceed 30')
    .required('Username is a required'),
  password: yup
    .string()
    .min(5, 'Password length must be atleast 5')
    .max(50, 'Password length must not exceed 50')
    .required('Password is a required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], "Passwords don't match")
    .required('Password confirm is required'),
});

export const SignUpContainer = ({ onSubmit, notify }) => {
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
        value={formik.values.username}
        placeholder="Username"
      />
      {isInvalid('username') && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}
      <TextInput
        secureTextEntry
        style={[styles.input, isInvalid('password') && styles.errorBorder]}
        onChangeText={formik.handleChange('password')}
        value={formik.values.password}
        placeholder="Password"
      />
      {isInvalid('password') && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}
      <TextInput
        secureTextEntry
        style={[
          styles.input,
          isInvalid('passwordConfirm') && styles.errorBorder,
        ]}
        onChangeText={formik.handleChange('passwordConfirm')}
        value={formik.values.passwordConfirm}
        placeholder="Password Confirm"
      />

      {isInvalid('passwordConfirm') && (
        <Text style={styles.error}>{formik.errors.passwordConfirm}</Text>
      )}

      {notify && <Text style={styles.error}>{}</Text>}
      <Pressable
        style={[styles.input, styles.button]}
        onPress={formik.handleSubmit}
      >
        <Text fontWeight="bold" color="bgPrimary">
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [signUp, signUpError] = useSignUp();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    try {
      const { username, password } = values;
      await signUp({ username, password });
      await signIn({ username, password });

      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
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

export default SignUp;
