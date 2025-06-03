import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import theme from '../theme';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import NewReview from './NewReview';

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/newreview" element={<NewReview />} />
        <Route path="/" element={<RepositoryList />} />
        <Route path=":id" element={<SingleRepository />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundSecondary,
    flexGrow: 1,
    flexShrink: 1,
  },
});

export default Main;
