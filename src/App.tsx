import "@styles/App.scss";

import { Route, Routes, useSearchParams } from "react-router-dom";
import Viewer from "./Viewer";
import Generator from "./Generator";

export default function App() {
  const [searchParams] = useSearchParams();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Viewer
            remoteAppPort={parseInt(searchParams.get("remoteAppPort") ?? "5899")}
            showChannelName={searchParams.get("showChannelName") === "true"}
            hideNonTalking={searchParams.get("hideNonTalking") === "true"}
            clientLimit={searchParams.get("clientLimit") ? parseInt(searchParams.get("clientLimit") ?? "0") : 0}
            alignRight={searchParams.get("alignRight") === "true"}
            showTsAvatar={searchParams.get("showTsAvatar") === "true"}
          />
        }
      />
      <Route path="/generate" element={<Generator />} />
    </Routes>
  );
}
