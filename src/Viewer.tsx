import "@styles/Viewer.scss";
import useTSRemoteApp, { IClient } from "react-teamspeak-remote-app-api";
import TalkStatus from "@/components/TalkStatus";

export default function Viewer({
  remoteAppPort = 5899,
  showChannelName = false,
  hideNonTalking = false,
  clientLimit = 0,
  alignRight = false,
  showTsAvatar = false,
}: {
  remoteAppPort?: number;
  showChannelName?: boolean;
  hideNonTalking?: boolean;
  clientLimit?: number;
  alignRight?: boolean;
  showTsAvatar?: boolean;
}) {
  const { clients, activeConnectionId, currentChannel } = useTSRemoteApp({
    remoteAppPort: remoteAppPort,
    auth: {
      identifier: "de.tealfire.obs",
      version: "2.2.0",
      name: "TeamSpeak OBS Overlay",
      description: "A OBS overlay for TeamSpeak by DerTyp7",
    },
    logging: true,
  });

  const currentClients = clients.map((client) => {
    if (client.channel?.id === currentChannel?.id && client.channel.connection.id === activeConnectionId) {
      return client;
    }
  }) as IClient[];

  return (
    <div className={`viewer ${alignRight ? "viewer--align-right" : ""}`}>
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
          if (
            hideNonTalking &&
            (client.properties.inputMuted || client.properties.outputMuted || client.talkStatus == 0)
          ) {
            return null;
          }

          //* Normal client
          return (
            <div
              className={`client ${alignRight ? "client--align-right" : ""}`}
              key={`${client.id}-${client.channel?.connection.id}`}
            >
              <TalkStatus client={client} showTsAvatar={showTsAvatar} />
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
          <h5>1. Make sure to accept the overlay in your TeamSpeak-Client via the notifications</h5>
          <br />
          <h5>2. Enable remote apps inside the the TeamSpeak-Settings</h5>
          <br />
          <h5>3. Make sure to match the configuration port with the port in the TeamSpeak remote app settings</h5>
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
