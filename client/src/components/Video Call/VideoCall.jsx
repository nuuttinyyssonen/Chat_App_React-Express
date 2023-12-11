import Peer from 'simple-peer';
import socket from '../../socketConfig';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { IoIosCall } from "react-icons/io";
import { MdCallEnd } from "react-icons/md";
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
        socket.on('callUser', (data) => {
            setReceivingCall(true);
            setCallerSignal(data.signal);
        });
    }, []);

    const handleCallUser = async () => {
        try {
            const streamObject = await navigator.mediaDevices.getUserMedia({ audio: true });
            setStream(streamObject);
            if (video.current && stream) {
                video.current.srcObject = stream;
            }

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
                callersVideo.current.srcObject = stream;
            });

            socket.on('callAccepted', (signal) => {
                setCallAccepted(true);
                peer.signal(signal);
            });

            connectionRef.current = peer;
        } catch (error) {
            console.error(error);
        }
    };

    const answerCall = async () => {
        try {
            const streamObject = await navigator.mediaDevices.getUserMedia({ audio: true });
            setStream(streamObject);
            if (video.current && stream) {
                video.current.srcObject = stream;
            }

            console.log('User media stream obtained successfully');

            const peer = new Peer({
                initiator: false,
                trickle: false,
                stream: stream
            });

            peer.on('signal', (data) => {
                socket.emit('answerCall', { signal: data, room: roomId });
            });

            peer.on('stream', (stream) => {
                callersVideo.current.srcObject = stream;
            });

            peer.signal(callerSignal);
            connectionRef.current = peer;
        } catch (error) {
            console.error(error);
        }
    };

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy()
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
                ? <MdCallEnd className='send-btn' onClick={leaveCall}/>
                : <IoIosCall className='send-btn' onClick={handleCallUser}/>}
            </div>
            <div className='answerContainer'>
                {receivingCall && !callAccepted && <button onClick={answerCall}>Answer</button>}
            </div>
        </div>
    );
};

export default VideoCall;
