import React from 'react';
import {TouchableOpacity } from 'react-native';
import { Container, Content, Text, Card, CardItem,Body } from 'native-base';
import { connect } from "react-redux";
import { deckListBackground, deckItemBackground, textLight } from "../utils/colors";

class Main extends React.Component {

    deckCardClick ({id, title}) {
        this.props.navigation.navigate("SingleDeckView", {
            deckId : id,
            title : title
        })
    }

    render() {
        const { decks } = this.props;
        return (
            <Container>
                <Content style={{backgroundColor: deckListBackground}} padder >
                    {
                        decks && Object.keys(decks).map((id)=> (
                            <TouchableOpacity key={id} onPress={() => this.deckCardClick(decks[id])}>
                                <Card bordered >
                                    <CardItem header style={{justifyContent:"center",backgroundColor: deckItemBackground}} >
                                            <Text  style={{color:textLight}}>{decks[id].title}</Text>
                                    </CardItem>
                                    <CardItem style={{backgroundColor: deckItemBackground}}>
                                        <Body style={{alignItems:"center"}}>
                                            <Text style={{color:textLight}}>
                                                {decks[id].questions.length} cards
                                            </Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>
                        ))
                    }
                    
                </Content>
            </Container>
        );
    }
}

function mapStateToProps({decks}) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Main);
