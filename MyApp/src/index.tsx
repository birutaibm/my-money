import 'react-native-gesture-handler';
import React from 'react';
import {View, StatusBar} from 'react-native';

import Routes from './routes';
import AppContainer from './hooks';

const App: React.FC = () => {
  return (
    <View style={{backgroundColor: '#123', flex: 1}}>
      <StatusBar barStyle="light-content" backgroundColor="#123" />
      <AppContainer>
        <Routes />
      </AppContainer>
    </View>
  );
};

export default App;
