import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router';

const Interview = () => {
  const { interviewId } = useParams();
  const audioRef = React.useRef<HTMLAudioElement>(null);

  useEffect(() => {
    (async () => {
      const pc = new RTCPeerConnection();

      audioRef.current = document.createElement("audio");
      audioRef.current.autoplay = true;
      pc.ontrack = e => audioRef.current!.srcObject = e.streams[0]!;

      // add local audio track for mic input in browser
      const localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      pc.addTrack(localStream.getTracks()[0]!);


      //start the session using SDP
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      try {
        const sdpResponse = await axios.post(`${process.env.BUN_PUBLIC_BACKEND_URL}/api/v1/session`, offer.sdp, {
          headers: {
            "Content-Type": "application/sdp"
          }
        });

        const answer = {
          type: "answer" as RTCSdpType,
          sdp: sdpResponse.data.sdp.text()
        }

        await pc.setRemoteDescription(answer);
      }
      catch (error) {
        console.error("Error during session setup:", error);
      }
    }
    )();

    return () => {
      //cleanup
    }
  }, [])


  return (
    <div>
      Interview: {interviewId}
      <audio ref={audioRef} autoPlay></audio>
    </div>
  )
}

export default Interview