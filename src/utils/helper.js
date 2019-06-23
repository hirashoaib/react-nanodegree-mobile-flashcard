import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";

const MOBILE_FLASHCARD_NOTIFICATION = "MOBILE_FLASHCARD_NOTIFICATION";

function createNotification(){
    return {
        title: "One Quiz Due Today!!!",
        body: "You have one quiz due Today, don't forget to attempt one",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification(){
    AsyncStorage.getItem(MOBILE_FLASHCARD_NOTIFICATION)
        .then(JSON.parse)
        .then((data) => {
            if(data === null){
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status})=> {
                        if(status === 'granted'){
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(9);
                            tomorrow.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time:tomorrow,
                                    repeat: 'day',
                                }
                            )
                            AsyncStorage.setItem(MOBILE_FLASHCARD_NOTIFICATION,JSON.stringify(true));
                        }
                    })
            }
        })
}

export function clearLocalNotification(){
    return AsyncStorage.removeItem(MOBILE_FLASHCARD_NOTIFICATION)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}