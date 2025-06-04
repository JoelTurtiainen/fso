import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import useCreateReview from '../hooks/useCreateReview';
import { StyleSheet, View, TextInput, Pressable } from 'react-native';
import theme from '../theme';
import Text from './Text';

const initialValues = {
  repositoryName: '',
  ownerName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  repositoryName: yup
    .string()
    .required("Repository owner's username is a required field"),
  ownerName: yup.string().required("Repository's name is a required field"),
  rating: yup
    .number()
    .min(0)
    .max(100)
    .required('Rating is a required number between 0 and 100'),
  text: yup.string().optional(),
});

export const NewReviewContainer = ({ onSubmit, errorMessage = '' }) => {
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
        onChangeText={formik.handleChange('ownerName')}
        placeholder="Repository owner's username"
        style={[styles.input, isInvalid('ownerName') && styles.errorBorder]}
        value={formik.values.ownerName}
      />
      {isInvalid('ownerName') && (
        <Text style={styles.error}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        onChangeText={formik.handleChange('repositoryName')}
        placeholder="Repository's name"
        style={[
          styles.input,
          isInvalid('repositoryName') && styles.errorBorder,
        ]}
        value={formik.values.repositoryName}
      />
      {isInvalid('repositoryName') && (
        <Text style={styles.error}>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        onChangeText={formik.handleChange('rating')}
        placeholder="Rating 0-100"
        style={[styles.input, isInvalid('rating') && styles.errorBorder]}
        value={formik.values.rating}
      />
      {isInvalid('rating') && (
        <Text style={styles.error}>{formik.errors.rating}</Text>
      )}
      <TextInput
        onChangeText={formik.handleChange('text')}
        placeholder="Review (Optional)"
        style={[styles.input, isInvalid('text') && styles.errorBorder]}
        value={formik.values.text}
      />
      {errorMessage && (
        <Text style={[styles.error, styles.errorBorder]}>{errorMessage}</Text>
      )}
      <Pressable
        onPress={formik.handleSubmit}
        style={[styles.input, styles.button]}
      >
        <Text fontWeight="bold" color="bgPrimary">
          Submit
        </Text>
      </Pressable>
    </View>
  );
};

const NewReview = () => {
  const navigate = useNavigate();
  const [create, result] = useCreateReview();

  const errorMessage = result?.error?.message ? result.error.message : null;

  const onSubmit = async (values) => {
    console.log(result);
    await create(values);
    navigate(`/${values.ownerName}.${values.repositoryName}`);
    try {
    } catch (e) {
      console.log(e);
    }
  };

  return <NewReviewContainer onSubmit={onSubmit} errorMessage={errorMessage} />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    height: 45,
    margin: 12,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
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

export default NewReview;
