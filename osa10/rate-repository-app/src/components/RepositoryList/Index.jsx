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

  onEndReach = () => {
    const { fetchMore } = this.props;
    fetchMore();
    console.log('You have reached the end of the list');
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
        onEndReached={repositoryNodes.length && this.onEndReach}
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

  const { repositories, fetchMore } = useRepositories({
    first: 8,
    sortQuery,
    searchKeyword,
  });

  return (
    <RepositoryListContainer
      navigate={navigate}
      fetchMore={fetchMore}
      repositories={repositories}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      setSortQuery={setSortQuery}
      sortQuery={sortQuery}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export default RepositoryList;
