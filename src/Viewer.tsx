import "@styles/Viewer.scss";
import useTSRemoteApp, { IClient } from "react-teamspeak-remote-app-api";

export default function Viewer({
  remoteAppPort = 5899,
  showChannelName = false,
  hideNonTalking = false,
  clientLimit = 0,
}: {
  remoteAppPort?: number;
  showChannelName?: boolean;
  hideNonTalking?: boolean;
  clientLimit?: number;
}) {
  const { clients, activeConnectionId, currentChannel } = useTSRemoteApp({
    remoteAppPort: remoteAppPort,
    auth: {
      identifier: "de.tealfire.obs",
      version: "2.2.0",
      name: "TS5 OBS Overlay",
      description: "A OBS overlay for TS5 by DerTyp7",
    },
    logging: true,
  });

  const currentClients = clients.map((client) => {
    if (client.channel?.id === currentChannel?.id && client.channel.connection.id === activeConnectionId) {
      return client;
    }
  }) as IClient[];

  return (
    <div className="viewer">
      {showChannelName && currentChannel ? (
        <div className="channelNameContainer">
          <h1>{currentChannel?.properties.name}</h1>
        </div>
      ) : null}
      {currentClients?.map((client, i) => {
        //* Client limit
        if (clientLimit != 0 && i >= clientLimit) {
          return null;
        }

        if (client) {
          //* Non-talking client
          if (hideNonTalking && (client.properties.inputMuted || client.properties.outputMuted || client.talkStatus == 0)) {
            return null;
          }

          //* Normal client
          return (
            <div className="client" key={`${client.id}-${client.channel?.connection.id}`}>
              {client.properties.outputHardware == false ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                  <title>muted_hardware_output</title>
                  <g id="muted_hardware_output.svg">
                    <path
                      d="M116.62,39a4.78,4.78,0,0,1-1.59.3l-6.29,3.63a45.42,45.42,0,0,1-13.33,57.64,49.4,49.4,0,0,1-5.82,3.62c-1.06.57-2.2.92-3.19,1.49-1.7,1-2.77,2.13-2.77,4.18a4.57,4.57,0,0,0,4.54,4.54,5.33,5.33,0,0,0,1.84-.35,54.49,54.49,0,0,0,26.94-75c-.12,0-.22,0-.34,0M88.18,13.58a4.57,4.57,0,0,0-4.54,4.54c0,2.06,1.06,3.19,2.77,4.18,1,.57,2.13.92,3.19,1.49a49.4,49.4,0,0,1,5.82,3.62,45.68,45.68,0,0,1,8.19,7.78l7-4a2.63,2.63,0,0,1,1.11-.34A54.31,54.31,0,0,0,90,13.94a5.33,5.33,0,0,0-1.84-.35"
                      fill="#d8d8d8"
                    />
                    <path
                      d="M59.46,71.4,32.77,86.81l19,19a4.51,4.51,0,0,0,3.19,1.35,4.57,4.57,0,0,0,4.54-4.54V71.4M54.92,20.88a4.51,4.51,0,0,0-3.19,1.35L28.12,45.85H9.54A4.57,4.57,0,0,0,5,50.38V77.62a4.57,4.57,0,0,0,4.54,4.54H22.26l37.2-21.48V25.42a4.57,4.57,0,0,0-4.54-4.54"
                      fill="#d8d8d8"
                    />
                    <path
                      d="M85.11,56.6l-7.87,4.54A10,10,0,0,1,77.62,64c0,8.58-8.23,7.09-8.23,12.48A4.53,4.53,0,0,0,73.93,81a4,4,0,0,0,1.77-.35A18.13,18.13,0,0,0,86.69,64a18.34,18.34,0,0,0-1.59-7.4M73.93,47a4.52,4.52,0,0,0-4.54,4.54,3.92,3.92,0,0,0,1.08,2.8l8.76-5.06a16.14,16.14,0,0,0-3.52-1.93A4,4,0,0,0,73.93,47"
                      fill="#d8d8d8"
                    />
                    <path
                      d="M100.87,47.49,93,52a27.15,27.15,0,0,1-8.36,33.87A36.79,36.79,0,0,1,79.25,89a4.54,4.54,0,0,0,1.84,8.72,5.24,5.24,0,0,0,1.77-.35,36.34,36.34,0,0,0,18-49.91M81,30.25A4.54,4.54,0,0,0,79.25,39a36.82,36.82,0,0,1,5.39,3.12,27,27,0,0,1,2.86,2.4l8.14-4.7A35.37,35.37,0,0,0,82.86,30.6,5.31,5.31,0,0,0,81,30.25"
                      fill="#d8d8d8"
                    />
                    <path
                      d="M126.57,43.71,10.42,110.77a2.88,2.88,0,0,1-3.93-1.05L4.33,106A2.88,2.88,0,0,1,5.38,102L121.53,35A2.88,2.88,0,0,1,125.46,36l2.16,3.75A2.88,2.88,0,0,1,126.57,43.71Z"
                      fill="#c9070a"
                    />
                  </g>
                </svg>
              ) : client.properties.inputHardware == false ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                  <title>muted_hardware_input</title>
                  <g id="muted_hardware_input.svg">
                    <path
                      d="M88.62,54.15V64A24.69,24.69,0,0,1,64,88.62a25.26,25.26,0,0,1-8.38-1.46l-7.39,7.39A34,34,0,0,0,64,98.46,34.5,34.5,0,0,0,98.46,64V54.15a4.92,4.92,0,1,1,9.85,0V64a44.31,44.31,0,0,1-39.38,44v10.15H88.62a4.92,4.92,0,0,1,0,9.85H39.38a4.92,4.92,0,1,1,0-9.85H59.08V108A43.3,43.3,0,0,1,41,101.77L21.46,121.31a2.46,2.46,0,0,1-3.54,0L11.62,115a2.46,2.46,0,0,1,0-3.54l94.92-94.92a2.46,2.46,0,0,1,3.54,0l6.31,6.31a2.46,2.46,0,0,1,0,3.54ZM22.92,80.46A43.3,43.3,0,0,1,19.69,64V54.15a4.92,4.92,0,1,1,9.85,0V64a35.94,35.94,0,0,0,1.15,8.69ZM39.38,64V24.62a24.62,24.62,0,0,1,47.77-8.38Z"
                      fill="#d8d8d8"
                    />
                    <rect x="-5.93" y="61.89" width="139.87" height="14.02" rx="2.87" ry="2.87" transform="translate(-29.97 65.43) rotate(-45)" fill="#c9070a" />
                  </g>
                </svg>
              ) : client.properties.outputMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                  <title>muted_output</title>
                  <g id="muted_output">
                    <path
                      d="M116.62,39a4.78,4.78,0,0,1-1.59.3l-6.29,3.63a45.42,45.42,0,0,1-13.33,57.64,49.4,49.4,0,0,1-5.82,3.62c-1.06.57-2.2.92-3.19,1.49-1.7,1-2.77,2.13-2.77,4.18a4.57,4.57,0,0,0,4.54,4.54,5.33,5.33,0,0,0,1.84-.35,54.49,54.49,0,0,0,26.94-75c-.12,0-.22,0-.34,0M88.18,13.58a4.57,4.57,0,0,0-4.54,4.54c0,2.06,1.06,3.19,2.77,4.18,1,.57,2.13.92,3.19,1.49a49.4,49.4,0,0,1,5.82,3.62,45.68,45.68,0,0,1,8.19,7.78l7-4a2.63,2.63,0,0,1,1.11-.34A54.31,54.31,0,0,0,90,13.94a5.33,5.33,0,0,0-1.84-.35"
                      fill="#c9070a"
                    />
                    <path
                      d="M59.46,71.4,32.77,86.81l19,19a4.51,4.51,0,0,0,3.19,1.35,4.57,4.57,0,0,0,4.54-4.54V71.4M54.92,20.88a4.51,4.51,0,0,0-3.19,1.35L28.11,45.85H9.53A4.57,4.57,0,0,0,5,50.38V77.62a4.57,4.57,0,0,0,4.54,4.54H22.25l37.2-21.48V25.42a4.57,4.57,0,0,0-4.54-4.54"
                      fill="#c9070a"
                    />
                    <path
                      d="M85.1,56.6l-7.87,4.54A10,10,0,0,1,77.61,64c0,8.58-8.23,7.09-8.23,12.48A4.53,4.53,0,0,0,73.92,81a4,4,0,0,0,1.77-.35A18.13,18.13,0,0,0,86.69,64a18.34,18.34,0,0,0-1.59-7.4M73.92,47a4.52,4.52,0,0,0-4.54,4.54,3.92,3.92,0,0,0,1.08,2.8l8.76-5.06a16.14,16.14,0,0,0-3.52-1.93A4,4,0,0,0,73.92,47"
                      fill="#c9070a"
                    />
                    <path
                      d="M100.87,47.49,93,52a27.15,27.15,0,0,1-8.36,33.87A36.79,36.79,0,0,1,79.24,89a4.54,4.54,0,0,0,1.84,8.72,5.24,5.24,0,0,0,1.77-.35,36.34,36.34,0,0,0,18-49.91M81,30.25A4.54,4.54,0,0,0,79.24,39a36.82,36.82,0,0,1,5.39,3.12,27,27,0,0,1,2.86,2.4l8.14-4.7A35.37,35.37,0,0,0,82.86,30.6,5.31,5.31,0,0,0,81,30.25"
                      fill="#c9070a"
                    />
                    <path
                      d="M126.57,43.71,10.42,110.77a2.88,2.88,0,0,1-3.93-1.05L4.33,106A2.88,2.88,0,0,1,5.38,102L121.53,35A2.88,2.88,0,0,1,125.46,36l2.16,3.75A2.88,2.88,0,0,1,126.57,43.71Z"
                      fill="#c9070a"
                    />
                  </g>
                </svg>
              ) : client.properties.inputMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                  <title>muted_input</title>
                  <g id="muted_input.svg">
                    <path
                      d="M88.62,54.15V64A24.69,24.69,0,0,1,64,88.62a25.26,25.26,0,0,1-8.38-1.46l-7.39,7.39A34,34,0,0,0,64,98.46,34.5,34.5,0,0,0,98.46,64V54.15a4.92,4.92,0,1,1,9.85,0V64a44.31,44.31,0,0,1-39.38,44v10.15H88.62a4.92,4.92,0,0,1,0,9.85H39.38a4.92,4.92,0,1,1,0-9.85H59.08V108A43.3,43.3,0,0,1,41,101.77L21.46,121.31a2.46,2.46,0,0,1-3.54,0L11.62,115a2.46,2.46,0,0,1,0-3.54l94.92-94.92a2.46,2.46,0,0,1,3.54,0l6.31,6.31a2.46,2.46,0,0,1,0,3.54ZM22.92,80.46A43.3,43.3,0,0,1,19.69,64V54.15a4.92,4.92,0,1,1,9.85,0V64a35.94,35.94,0,0,0,1.15,8.69ZM39.38,64V24.62a24.62,24.62,0,0,1,47.77-8.38Z"
                      fill="#c9070a"
                    />
                  </g>
                </svg>
              ) : client.talkStatus == 1 ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                  <title>player_on_v2</title>
                  <g id="player_on_v2.svg">
                    <path d="M64,128a64,64,0,1,1,64-64A64,64,0,0,1,64,128Z" fill="#00b4df" />
                  </g>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
                  <title>player_off_v2</title>
                  <g id="player_off_v2.svg">
                    <path d="M64,128a64,64,0,1,1,64-64A64,64,0,0,1,64,128Z" fill="#3e4f5e" />
                  </g>
                </svg>
              )}
              <p>{client.properties.nickname}</p>
            </div>
          );
        } else {
          return <div key={Math.random()}></div>;
        }
      })}
      {currentChannel == null ? (
        <>
          <h4>Overlay couldn't connect to the client:</h4>
          <br />
          <br />
          <h5>1. Make sure to accept the overlay in your TS5-Client via the notifications</h5>
          <br />
          <h5>2. Enable remote apps inside the the TS5-Settings</h5>
          <br />
          <h5>3. Make sure to match the configuration port with the port in the TS5 remote app settings</h5>
          <br />
          <h5>4. Refresh this page/BrowserSource (Select BrowserSource & click "Refresh" in OBS)</h5>
          <br />
          <h6>If non of this worked refer to the GitHub and write an issue with your problem</h6>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
