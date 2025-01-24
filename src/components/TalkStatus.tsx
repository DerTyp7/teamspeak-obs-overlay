import "@styles/TalkStatus.scss";
import { IClient } from "react-teamspeak-remote-app-api";
import MutedHardwareOutputSvg from "@assets/icons/muted_hardware_output.svg?react";
import InputHardwareSvg from "@assets/icons/input_hardware.svg?react";
import OutputMutedSvg from "@assets/icons/output_muted.svg?react";
import InputMutedSvg from "@assets/icons/input_muted.svg?react";
import TalkingSvg from "@assets/icons/talk.svg?react";
import NotTalkingSvg from "@assets/icons/not_talk.svg?react";

// TODO outsource svg to files
export default function TalkStatus({ client, showTsAvatar }: { client: IClient; showTsAvatar: boolean }) {
  function getTeamSpeakAvatarUrl(): string {
    // MyTeamSpeak avatar property looks like this:
    // 1,https://storage.googleapis.com/ts-sys-myts-avatars/d4864285-0b77-4f2d-b0c5-1ae585e66ee5/258947109;2,https://storage.googleapis.com/ts-sys-myts-avatars/d4864285-0b77-4f2d-b0c5-1ae585e66ee5/71073868;4,https://storage.googleapis.com/ts-sys-myts-avatars/d4864285-0b77-4f2d-b0c5-1ae585e66ee5/1260429936
    // 2, is the avatar we want to use. The other ones are away and busy avatars.
    return (
      client.properties.myteamspeakAvatar.split("2,")[1] ??
      client.properties.myteamspeakAvatar.split(";")[0].split(",")[1]
    );
  }

  return (
    <div className={`talkStatus ${showTsAvatar ? "talkStatus--avatar" : ""} `}>
      {showTsAvatar ? (
        <div className={`avatar ${client.talkStatus === 1 ? "avatar--talk" : ""}`}>
          <img src={getTeamSpeakAvatarUrl()} alt="" />
        </div>
      ) : null}

      {client.properties.outputHardware === false ? (
        <MutedHardwareOutputSvg />
      ) : client.properties.inputHardware === false ? (
        <InputHardwareSvg />
      ) : client.properties.outputMuted ? (
        <OutputMutedSvg />
      ) : client.properties.inputMuted ? (
        <InputMutedSvg />
      ) : client.talkStatus === 1 && !showTsAvatar ? (
        <TalkingSvg />
      ) : !showTsAvatar ? (
        <NotTalkingSvg />
      ) : (
        <svg></svg>
      )}
    </div>
  );
}
