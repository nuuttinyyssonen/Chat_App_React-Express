import Peer from 'simple-peer';
import socket from '../../socketConfig';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { MdCallEnd, MdCall } from "react-icons/md";
import '../../style/main/video.css'
import useGetUserData from '../../hooks/useGetUserData';

const VideoCall = () => {
    const roomId = useParams().id;
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);

    const video = useRef();
    const callersVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream)
            if (video.current && stream) {
                video.current.srcObject = stream;
            }
        });
        socket.on('callUser', (data) => {
            console.log("call")
            setReceivingCall(true);
            setCallerSignal(data.signal);
        });
    }, []);

    // console.log(receivingCall)

    const handleCallUser = () => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        });

        peer.on('signal', (data) => {
            socket.emit('callUser', {
                signalData: data,
                room: roomId
            })
        });

        peer.on('stream', (stream) => {
            console.log(stream)
            if (callersVideo.current && stream) {
                callersVideo.current.srcObject = stream;
            }
        });

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, room: roomId });
        });

        peer.on('stream', (stream) => {
            // console.log(stream)
            console.log('Received stream in answerCall:', stream);
            console.log('callersVideo.current:', callersVideo.current);
            console.log('myVideo.current:', video.current);
            callersVideo.current.srcObject = stream;
            console.log(callersVideo.current.srcObject)
        });

        peer.signal(callerSignal);
        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);
        if (connectionRef.current && connectionRef.current.destroy) {
            connectionRef.current.destroy();
            console.log('disconnected')
        }
    };

    return (
        <div className='VideoCallContainer'>
             <div className='video-container'>
                 {stream && <video playsInline muted ref={video} autoPlay />}
             </div>
             <div className='video-container'>
                 { callAccepted && !callEnded && <video playsInline ref={callersVideo} autoPlay /> }
             </div>
             <div className='call-buttons'>
                 {callAccepted && !callEnded
                 ? <MdCallEnd onClick={() => leaveCall()} className='send-btn'/>
                 : <MdCall onClick={() => handleCallUser()} className='send-btn'/> }
             </div>
             <div className='answerContainer'>
                 {receivingCall && !callAccepted && <button onClick={() => answerCall()}>Answer</button>}
             </div>
        </div>
    );
};

export default VideoCall;
