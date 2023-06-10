import React, {useEffect} from 'react';
import styles from './Video.modeule.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useHistory } from 'react-router-dom';


export default function Video() {
    const { id } = useParams();

    const myMeeting = async (element) => {
        const appID = 1451019997;
        const serverSecret = "c9583bd7c4a0c1b9f2382d436b36ab45";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID, 
            serverSecret, 
            id, 
            Date.now().toString(),
            "Shagun"
        );
        // const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));
        const zip = ZegoUIKitPrebuilt.create(kitToken);
        zip.joinRoom({
            container: element,
            scenario:{
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
        });
    };

    return (
        <div>
            <h1 className={styles.header}>Group Video Call</h1><br />
            <div ref={myMeeting}/>
        </div>
    )
}
