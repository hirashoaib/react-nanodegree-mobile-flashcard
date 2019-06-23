import React from 'react';
import { Container, Spinner,Text } from 'native-base';
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './src/reducers'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import FlashcardApp from './src/components/FlashcardApp';
import { setLocalNotification } from './src/utils/helper';

function configureStore() {
    return createStore(reducer, {}, applyMiddleware(thunk, logger));
}


export default class App extends React.Component {

    state = {
        appStarted: false,
    };

    async componentWillMount() {
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
        this.setState({
          appStarted: true
        })
    }

    componentDidMount(){
        setLocalNotification();
    }

    render() {
        if(this.state.appStarted){
            return (
              <Provider store={configureStore()}>
                  <FlashcardApp />
              </Provider>
            );  
        }
        else {
            return  (
                <Container>
                    <Spinner style={{color: "#261514"}} />
                </Container>
            )
        }
    }
}

