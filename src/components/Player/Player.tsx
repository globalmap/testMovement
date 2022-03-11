import React, { useEffect, useState } from "react";
import load3kit from "../../utils/load3kit";
import { clickTools } from "../../utils/threekit/threekitTools";
import { PlayerLoadSuccess } from "../../redux/actions/player.actions";
import { useAppDispatch } from "../../utils/hooks";

declare global {
  interface Window {
    threekitPlayer: any;
    player: any;
    configurator: any;
    points: any,
    models: string[]
  }
}

export const THREEKIT_PARAMS = {
  threekitUrl: "https://preview.threekit.com/",
  // authToken: "15e739db-c362-4062-83bd-126126e5f303",
  authToken: "287b9d90-f57a-4a9b-8951-d1108db30d76",
  // assetId: "4daa1759-80a3-4787-a39a-c1239375e742",
  assetId: "810861ad-3065-4d13-b6c6-dc08819cea7a",
  // orgId: "d302a225-e475-477c-8f4e-e5834f24148e",
  orgId: "f6664549-58df-4a22-881e-956c5d77d349",
}


export const Player = () => {
  const dispatch = useAppDispatch();

  const [loaded, setLoaded] = useState(false);
  const [loadState, setLoadedState] = useState(false)
  const playerEl: any = React.createRef();

  const init3kit = () => {
    if (!playerEl.current) return false;
    if (window.threekitPlayer) {
      window
        .threekitPlayer({
          authToken: THREEKIT_PARAMS['authToken'],
          el: playerEl.current,
          assetId: THREEKIT_PARAMS['assetId'],
        })
        .then(async (api: any) => {
          window.player = api;

          window.configurator = await window.player.getConfigurator();
          window.configurator.setConfiguration({"Models": [
            {
              // assetId: "29ac94f0-e0b2-46ff-8fb3-178c772ac788"
              assetId: "51d2c8e3-0692-4045-9592-3b01b49b07ed"

            },
          ]})
					await window.player.tools.addTool(clickTools(dispatch));
          dispatch(PlayerLoadSuccess())
        });
    }
  };

  useEffect(() => {
    setLoaded(true);
    init3kit();
  });

  return (
    <div style={{height: "100vh", width: "85%"}}>
      {loaded ? (
        <>
          <div id="player" style={{height: "100vh"}} ref={playerEl} />
        </>
      ) : ""}
    </div>
  );
}