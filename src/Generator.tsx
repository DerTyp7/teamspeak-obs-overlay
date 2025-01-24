import { ChangeEvent, useRef, useState, useEffect } from "react";
import "@styles/Generator.scss";
import Viewer from "./Viewer";

export default function Generator() {
  // State variables
  const [outputUrl, setOutputUrl] = useState(() => new URL(window.location.href).toString());
  const copiedTooltipRef = useRef<HTMLDivElement>(null);

  const [remoteAppPort, setRemoteAppPort] = useState(5899);
  const [showChannelName, setShowChannelName] = useState(true);
  const [alignRight, setAlignRight] = useState(false);
  const [hideNonTalking, setHideNonTalking] = useState(false);
  const [clientLimit, setClientLimit] = useState(0);

  // Effect to generate URL when dependencies change
  useEffect(() => {
    generateUrl();
  }, [remoteAppPort, showChannelName, hideNonTalking, clientLimit, alignRight]);

  // Function to generate the output URL
  function generateUrl() {
    const url = new URL(window.location.href);
    url.hash = "";

    url.searchParams.set("remoteAppPort", remoteAppPort.toString());
    url.searchParams.set("showChannelName", showChannelName.toString());
    url.searchParams.set("hideNonTalking", hideNonTalking.toString());
    url.searchParams.set("clientLimit", clientLimit.toString());
    url.searchParams.set("alignRight", alignRight.toString());

    // url.hash function always sets the hash to the end of the URL, so we have to replace the question mark with a hash
    // gh-pages needs the hash to be between the base URL and the search params
    setOutputUrl(url.toString().replace("?", "#/?"));
  }

  // Function to copy URL to clipboard
  function copy() {
    navigator.clipboard.writeText(outputUrl);

    if (copiedTooltipRef.current) {
      copiedTooltipRef.current.style.animation = "tooltipAnimation 200ms";
      copiedTooltipRef.current.style.opacity = "1";

      setTimeout(() => {
        if (copiedTooltipRef.current) {
          copiedTooltipRef.current.style.opacity = "0";
          copiedTooltipRef.current.style.animation = "";
        }
      }, 1000);
    }
  }

  return (
    <div className="generator">
      {/* Header */}
      <div className="headline">
        <h1>TeamSpeak-OBS-Overlay Generator</h1>
        <h4>by DerTyp7</h4>
      </div>

      {/* Instructions */}
      <div className="instructions">
        <p>1. Customize your settings</p>
        <p>2. Copy the generated URL</p>
        <p>3. Paste the URL into the BrowserSource URL field in OBS</p>
        <a href="https://github.com/DerTyp7/ts5-obs-overlay#detailed-instructions">
          Click here for detailed instructions
        </a>
      </div>

      {/* Output Section */}
      <div className="output">
        <p className="url">
          <code>{outputUrl}</code>
        </p>
        <button onClick={copy} className="copy">
          Copy
        </button>
        <div ref={copiedTooltipRef} className="copiedTooltip">
          Copied!
        </div>
      </div>

      {/* Generator Content */}
      <div className="generatorContent">
        {/* Configurations */}
        <div className="configurations">
          <h2>Configurations</h2>

          <div className="options">
            {/* Option Sections */}
            <section>
              {/* Show Channel Name Option */}
              <div className="option" onClick={() => setShowChannelName(!showChannelName)}>
                <input type="checkbox" checked={showChannelName} />
                <label>Show channel name</label>
              </div>

              {/* Hide Non-Talking Clients Option */}
              <div className="option" onClick={() => setHideNonTalking(!hideNonTalking)}>
                <input type="checkbox" checked={hideNonTalking} />
                <label>Hide non talking clients</label>
              </div>

              {/* Alignment Option */}
              <div className="option" onClick={() => setAlignRight(!alignRight)}>
                <input type="checkbox" checked={alignRight} />
                <label>Align Right</label>
              </div>
            </section>

            <section>
              {/* Client Limit Option */}
              <div className="option">
                <input
                  type="number"
                  value={clientLimit}
                  min={0}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setClientLimit(parseInt(e.target.value))}
                />
                <label>Client Limit</label>
              </div>

              {/* RemoteApp-Port Option */}
              <div className="option">
                <input
                  type="number"
                  value={remoteAppPort}
                  min={0}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setRemoteAppPort(parseInt(e.target.value))}
                />
                <label>RemoteApp-Port</label>
              </div>
            </section>
          </div>
        </div>

        {/* Preview */}
        <div className="preview">
          <Viewer
            remoteAppPort={remoteAppPort}
            showChannelName={showChannelName}
            hideNonTalking={hideNonTalking}
            clientLimit={clientLimit}
            alignRight={alignRight}
          />
        </div>
      </div>
    </div>
  );
}
