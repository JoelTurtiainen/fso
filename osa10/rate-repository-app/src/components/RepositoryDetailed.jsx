import RepositoryItem from './RepositoryItem/Index';
import useRepository from '../hooks/useRepository';
import { useParams } from 'react-router-native';
import { View } from 'react-native';

const RepositoryDetailed = () => {
  const repositoryId = useParams();
  const { repository, loading } = useRepository(repositoryId);
  if (loading) return;
  return <RepositoryItem data={repository} showLink={true} />;
};

export default RepositoryDetailed;
