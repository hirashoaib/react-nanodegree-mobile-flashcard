import React from 'react';
import { StyleSheet} from 'react-native';
import { Container, Button, Text, Item, Input, Form } from 'native-base';
import { connect } from "react-redux";
import { handleAddCard  } from "../actions/deckAction";
import { appBackgroundColor, btnDark, textDark } from "../utils/colors";

const styles = StyleSheet.create({
    addCardContainer: {
        flex:1,
        alignItems: 'center',
        backgroundColor: appBackgroundColor
    },
    addCardItem :{
        marginTop:30,
        marginLeft:20,
        marginRight:20,
        backgroundColor:"white"
    }
})

class AddCardToDeckView extends React.Component {

    state = {
        textBoxQuestion:'',
        textBoxAnswer:''
    };

    onAddPress() {
        const { deckId } = this.props.navigation.state.params;
        const { textBoxQuestion, textBoxAnswer } = this.state;
        if(!textBoxQuestion || !textBoxAnswer) {
            return alert("Please Enter all the fields")
        }
        this.props.addCard(deckId, {
            question : textBoxQuestion,
            answer : textBoxAnswer
        });
        this.props.navigation.goBack();
    }

    onChangeQuestion = (value)=>{
        this.setState({ textBoxQuestion: value });
    }

    onChangeAnswer = (value)=>{
        this.setState({ textBoxAnswer: value });
    }
    
    render() {        
        return (
            <Container style={styles.addCardContainer}>
                    <Form style={{alignSelf:"stretch"}}>
                        <Item style={styles.addCardItem} rounded>
                            <Input placeholder='Question'
                                onChangeText={this.onChangeQuestion} />
                        </Item>

                        <Item style={styles.addCardItem} rounded>
                            <Input placeholder='Answer' 
                                onChangeText={this.onChangeAnswer}/>
                        </Item>
                    </Form>
                    <Button style={{margin: 30, backgroundColor: btnDark}} onPress={()=> this.onAddPress() } block >
                        <Text style={{color: textDark}}>Submit</Text>
                    </Button>
            </Container>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addCard: (deckId, card) => {
            dispatch(handleAddCard(deckId, card));
        }
    };
}

export default connect(null, mapDispatchToProps)(AddCardToDeckView);

