import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import { Container, Button, Text, Item, Input, Form } from 'native-base';
import { connect } from "react-redux";
import { handleSaveDecks} from "../actions/deckAction";
import { textDark, btnDark, appBackgroundColor } from "../utils/colors";

const styles = StyleSheet.create({
    title : {
        fontWeight:"bold",
        fontSize: 20,
        marginTop:30,
        marginBottom:30,
        color: textDark,
        alignSelf:"center"
    },
    addDeckContainer: {
        flex:1,
        backgroundColor: appBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

class AddDeckView extends React.Component {

    state = {
        deckTitle:''
    };    

    componentWillReceiveProps(nextProps){
        if(nextProps.saveDeckId !== this.props.saveDeckId){
            this.props.navigation.navigate("SingleDeckView", {
                deckId : nextProps.saveDeckId,
                title : this.state.deckTitle
            })
            this.setState({deckTitle:''});
        }
    }

    render() {
        return (            
                <Container style={styles.addDeckContainer}>
                    <KeyboardAvoidingView behavior="padding">
                        <Text style={styles.title}>What is the title of your new deck?</Text>
                        <Form style={{alignSelf:"stretch"}}>
                            <Item style={{backgroundColor:"white"}} rounded>
                                <Input  placeholder='Deck Title' 
                                    value={this.state.deckTitle}
                                    onChangeText={this.onDeckTitleChange} />
                            </Item>
                        </Form>
                        
                        <View style={{flex:1, flexDirection:"row",  alignSelf:"stretch", justifyContent:"center"}} full>
                            <Button style={{alignSelf:"center", backgroundColor: btnDark}} onPress={()=> this.onAddDeckPress() }>
                                <Text style={{color: textDark}}>
                                    Create Deck
                                </Text>
                            </Button>
                        </View>
                    </KeyboardAvoidingView>
                </Container>            
        );
    }

    onAddDeckPress() {
        if(!this.state.deckTitle) {
            return alert("Deck title is required")
        }
        this.props.addDeck(this.state.deckTitle);        
    }

    onDeckTitleChange = value => {
        this.setState({ deckTitle: value });
    };
}

function mapStateToProps({saveDeckId}) {
    return {
        saveDeckId : saveDeckId.saveDeckId
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addDeck: (deckTitle) => {
            dispatch(handleSaveDecks(deckTitle));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeckView);