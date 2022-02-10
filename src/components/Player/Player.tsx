import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import load3kit from "../../utils/load3kit";
import { clickTools, movementTool } from "../../utils/threekit/threekitTools";
import { List } from "../List/List";

declare global {
  interface Window {
    threekitPlayer: any;
    player: any;
    configurator: any;
    points: any
  }
}

export const THREEKIT_PARAMS = {
  threekitUrl: "https://preview.threekit.com/",
  authToken: "1d561249-b5d9-479c-b0dc-0fef31ac00d9",
  assetId: "4daa1759-80a3-4787-a39a-c1239375e742",
  orgId: "d302a225-e475-477c-8f4e-e5834f24148e",
}


export const Player = () => {
  const dispatch = useDispatch();

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
					showConfigurator: true,
          
          display: "webgl"
        })
        .then(async (api: any) => {
          window.player = api;
          // await api.when('preloaded');
          // await window.player.when('loaded');

          window.configurator = await window.player.getConfigurator();
          window.configurator.setConfiguration({"add_cube_OH": [
            {
              assetId: "40908f80-f3cb-473b-a771-ef78668ae313",
              configuration: "",
              type: "model",
            },
          ]})

					// await window.player.tools.addTool(movementTool());
					await window.player.tools.addTool(clickTools());


        });
    }
  };

  useEffect(() => {
    load3kit(null, () => {
      setLoaded(true);
      init3kit();
    });
  });

  return (
    <div style={{height: "100vh"}}>
      {loaded ? (
        <>
          <div id="player" style={{height: "100vh"}} ref={playerEl} />
        </>
      ) : ""}
    </div>
  );
}