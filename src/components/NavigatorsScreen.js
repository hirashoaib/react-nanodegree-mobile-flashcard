import { createStackNavigator, createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import { navigationBarColor, textLight } from "../utils/colors";
import Main from './Main';
import AddDeckView from './AddDeckView';
import SingleDeckView from './SingleDeckView';
import AddCardToDeckView from './AddCardToDeckView';
import QuizView from './QuizView';


const MaterialTopTabNavigator = createMaterialTopTabNavigator({
    Home: {
        screen: Main,
        navigationOptions: {
            tabBarLabel: "Decks",
        },
        
    },
    AddDeckView: {
        screen: AddDeckView,
        navigationOptions: {
            tabBarLabel: "Add Deck"
        }
    }
},
{
    tabBarOptions : {
        labelStyle: {
            fontWeight: "bold"
        },
        style: {
            backgroundColor: navigationBarColor,
        },
    }
})
MaterialTopTabNavigator.navigationOptions = {
    header: null
};

const MainNavigatorScreen = createStackNavigator({
    Main: {
        screen: MaterialTopTabNavigator,
    },
    SingleDeckView: {
        screen: SingleDeckView,
        
    },
    AddCardToDeckView: {
        screen: AddCardToDeckView,
        navigationOptions: {
            title: "Add Card",
            headerTintColor:textLight,
            headerStyle: {
                backgroundColor: navigationBarColor
            }
        }
    },
    QuizView: {
        screen: QuizView,
        navigationOptions: {
            title: "Quiz",
            headerTintColor:textLight,
            headerStyle: {
                backgroundColor: navigationBarColor
            }
        }
    }
})

export default createAppContainer(MainNavigatorScreen);