import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Button, Text } from 'native-base';
import { connect } from "react-redux";
import { btnDark, navigationBarColor, textDark, appBackgroundColor } from "../utils/colors";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appBackgroundColor,
    },
    deckTitle: {
        fontSize: 35,
        fontWeight:"bold",
        marginBottom: 40,
        color:"white"
    },
    deckCardCount: {
        fontSize: 30,
        marginBottom: 40,
        color:"white"
    },
    btn: {
        margin: 20
    },
})

class SingleDeckView extends React.Component {
    
    static navigationOptions = ({navigation}) => {
        const { title } = navigation.state.params;

        return {
            title: title,
            headerTintColor:"white",
            headerStyle: {
                backgroundColor: navigationBarColor
            }
        }
    } 

    componentWillReceiveProps(nextProps){
        if(!nextProps.deck){
            this.props.navigation.goBack();
        }
    }
    
    render() {
        const { deck } = this.props;
        if(deck){
            return (
                <Container style={styles.container}>
                    <Text style={styles.deckTitle}>{deck.title}</Text>
                    <Text style={styles.deckCardCount}>{deck.questions.length} cards</Text>
                    <Button style={[styles.btn,{backgroundColor: btnDark}]} onPress={()=> this.props.navigation.navigate("AddCardToDeckView", {deckId: deck.id}) }  block >
                        <Text style={{color: textDark}}>Add Card</Text>
                    </Button>
                    <Button style={[styles.btn, {backgroundColor: btnDark}]} onPress={()=> this.props.navigation.navigate("QuizView", {deckId: deck.id}) } block >
                        <Text style={{color: textDark}} >Start Quiz</Text>
                    </Button>
                </Container>
            );
        }
        else {
            return null;
        }
    }
}

function mapStateToProps({decks}, props) {
    const { deckId } = props.navigation.state.params;
    return {
        deck : decks[deckId]
    }
}

export default connect(mapStateToProps)(SingleDeckView);