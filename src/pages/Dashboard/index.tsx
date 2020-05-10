import React from 'react';
import { View } from 'react-native';

import { useAuth } from '../../hooks/Auth';

import { Container, MessageText } from './styles';

import Button from '../../components/Button';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <MessageText>Work in Progress!</MessageText>
      <Button onPress={() => signOut()}>Logout</Button>
    </Container>
  );
};

export default Dashboard;
