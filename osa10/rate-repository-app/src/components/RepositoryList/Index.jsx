import { Component, useState } from 'react';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';

import useRepositories from '../../hooks/useRepositories';
import RepositoryItem from '../RepositoryItem/Index';
import RepositoryListHeader from './Header';

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends Component {
  renderHeader = () => {
    const props = this.props;

    return (
      <RepositoryListHeader
        sortQuery={props.sortQuery}
        setSortQuery={props.setSortQuery}
        searchQuery={props.searchQuery}
        setSearchQuery={props.setSearchQuery}
      />
    );
  };

  render() {
    const { repositories, navigate } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(item.id)}>
            <RepositoryItem data={item} />
          </Pressable>
        )}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortQuery, setSortQuery] = useState('latest');
  const [searchKeyword] = useDebounce(searchQuery, 500);

  const { repositories } = useRepositories({
    sortQuery,
    searchKeyword,
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      navigate={navigate}
      sortQuery={sortQuery}
      setSortQuery={setSortQuery}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export default RepositoryList;
