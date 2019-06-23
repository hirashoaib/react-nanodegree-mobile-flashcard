import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Container, Button, Text, View } from 'native-base';
import { connect } from "react-redux";
import { textDark, appBackgroundColor, quizQuestion, btnDark } from "../utils/colors";
import { clearLocalNotification, setLocalNotification } from "../utils/helper";

const styles = StyleSheet.create({
    
    resultContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:appBackgroundColor,
    },
    questionBox: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get("window").width-20,
        height: 300,
        backgroundColor: quizQuestion,
        marginLeft:10,
        borderRadius:40
    },
    questionOrAnswer : {
        fontSize: 25,    
        marginLeft: 10,
        marginRight:10,
    },
    questionRemaining: {
        fontSize: 20,
        marginLeft:20,
        color: "white"
    },
})


class QuizView extends React.Component {

    state = {
        index: 0,
        questionsCorrectedCount: 0,
        isCompleted: false,
        toggleBtnText: "Show Answer",
        showQuestion: true
    };

    flipQuestionAnswer() {
        this.setState({showQuestion: !this.state.showQuestion});
        if(this.state.showQuestion){
            this.setState({toggleBtnText:"Show Answer"});
        }
        else {
            this.setState({toggleBtnText:"Show Question"});
        }
    }

    handelSubmitAnswer(isCorrect){
        this.setState((state, props)=> {
            const newIndex = ++state.index;
            return {
                questionsCorrectedCount: isCorrect? ++state.questionsCorrectedCount: state.questionsCorrectedCount,
                index: newIndex,
                isCompleted: props.deck.questions.length === newIndex,
                showQuestion: true
            }
        });
    }

    refresh() {
        this.setState({
            index:0,
            isCompleted: false,
            questionsCorrectedCount:0,            
            showQuestion: true
        });
    }

    setupNotificaiton(){
        clearLocalNotification().then(setLocalNotification);
    }

    render() {
        const { questions } = this.props.deck;
        if (this.state.isCompleted) {
            this.setupNotificaiton();
            return this.showIfQuizCompleted();
        }
        else if(questions && questions.length){
            return this.showIfQuestionsFound(questions);
        }
        else {
            return (
                <Container style={styles.resultContainer}>                
                    <View >
                        <Text style={{fontSize:20, alignSelf:"center", marginLeft:20, marginRight:20, color: "white"}}>No Cards in Deck, cannot start quiz</Text>
                    </View>
                </Container>
            );
        }
        
    }

    showIfQuestionsFound(questions){        
        const { index } = this.state
        return (
            <Container style={{backgroundColor:appBackgroundColor}}>                
                <View style={{marginBottom: 20}}>
                    <Text style={styles.questionRemaining}>{index+1}/{questions.length}</Text>
                </View>
                <View style={{flex:1}} >
                    <View style={[styles.questionBox]}>
                        <Text style={styles.questionOrAnswer}>{this.state.showQuestion? "Q: "+questions[index].question: "A: "+questions[index].answer}</Text>    
                    </View>
                </View>
                <View>
                    <Button style={{ marginTop: 50 }} onPress={()=> this.flipQuestionAnswer() } transparent danger block >
                        <Text style={{fontSize:20, alignSelf:"flex-end", color: "white"}}>{this.state.toggleBtnText}</Text>
                    </Button>
                </View>
                <View style={{flex:1}}>
                    <Button block rounded style={{margin: 20, backgroundColor:"#ffc107"}} onPress={()=> this.handelSubmitAnswer(true) } success>
                        <Text style={{color: textDark}}>Correct</Text>
                    </Button>
                    <Button block rounded style={{margin: 20, backgroundColor:"#D0D8D9"}} onPress={()=> this.handelSubmitAnswer(false) } danger>
                        <Text>Incorrect</Text>
                    </Button>
                </View>
                
            </Container>
        );
    }

    
    showIfQuizCompleted(){
        return (
            <Container style={styles.resultContainer}>                
                <View>
                    <Text style={{fontSize:20, alignSelf:"center",color: "white"}}>Quiz Completed</Text>
                    <Text style={{fontSize:20, alignSelf:"center", color: "white"}}>You have answered { Math.round((this.state.questionsCorrectedCount/this.props.deck.questions.length)*100)}% correct</Text>
                    <Button block rounded style={{backgroundColor: btnDark, margin: 20}} onPress={()=> this.refresh() }>
                        <Text style={{color: textDark}}>Restart Quiz</Text>
                    </Button>
                    <Button block rounded style={{backgroundColor: btnDark, margin: 20}} onPress={()=> this.props.navigation.goBack() }>
                        <Text style={{color: textDark}}>Back to Deck</Text>
                    </Button>
                </View>
            </Container>
        );
    }


}

function mapStateToProps({decks}, props) {
    const { deckId } = props.navigation.state.params;
    return {
        deck : decks[deckId]
    }
}


export default connect(mapStateToProps)(QuizView);

