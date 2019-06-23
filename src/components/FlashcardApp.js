import React from 'react';
import { View, StatusBar } from 'react-native';
import { Container } from 'native-base';
import { Constants } from "expo";
import { connect } from "react-redux";
import { handleAllDecks } from "../actions/deckAction";
import NavigatorsScreen from './NavigatorsScreen';

class FlashcardApp extends React.Component {

    componentDidMount() {
        this.props.getAllDecks();
    }

    render() {
        return (
            <Container>
                <View style={{height:Constants.statusBarHeight}}>
                    <StatusBar />
                </View>

                <NavigatorsScreen />
            </Container>
            
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllDecks: () => {
            dispatch(handleAllDecks());
        }
    };
}

export default connect(null, mapDispatchToProps)(FlashcardApp);
