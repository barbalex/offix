import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useOfflineMutation, useNetworkStatus } from 'react-offix-hooks';
import { AddTodo, TodoList, TodoModal, Loading, Error } from './components';
import { GET_TODOS, ADD_TODO } from './gql/queries';
import { mutateOptions } from './helpers';
import { View, Text, Button } from 'react-native';

const App = () => {
  const { loading, error, data, subscribeToMore } = useQuery(GET_TODOS);
  const [addTodo] = useOfflineMutation(ADD_TODO, mutateOptions.add);
  const [modalActive, setModalActive] = useState(false);

  const isOnline = useNetworkStatus();

  const toggleModal = () => {
    setModalActive(!modalActive);
  };

  if (loading) return <Loading />;

  if (error) return <Error error={error} />;

  return (
    <View>
      <View>
        <Text>OFFIX TODO</Text>
        <Text>A simple todo app using offix & graphback</Text>
        <Text>Network status: {(isOnline) ? 'Online' : 'Offline'}</Text>
      </View>

      <TodoModal
        title="Create a task"
        subtitle=""
        active={modalActive}
        close={toggleModal}
        Component={() => <AddTodo addTodo={addTodo} cancel={toggleModal} />}
      />

      <View>
        <Button title="Add" onPress={toggleModal} />
      </View>

      <View>
        <TodoList todos={data.findAllTodos} subscribeToMore={subscribeToMore} />
      </View>
    </View>
  );
};

export default App;
