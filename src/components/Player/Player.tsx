import React , { createRef, RefObject, useEffect, useState } from "react";
import s from "./Player.module.scss";
import { addedModel, loadPlayerSuccess } from "../../redux/actions/player.action";
import { THREEKIT_PARAMS } from "../../utils/constants";
import { useAppDispatch } from "../../utils/hooks";
import load3kit from "../../utils/threekit/loadThreekit";

const Player = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useAppDispatch();
  const playerEl: RefObject<HTMLDivElement> = createRef();

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

            const rotation = {x: 0, y: 0, z: 0}
            const translation = {x: 0, y: 0, z: 0}

            await dispatch(addedModel({assetId: "51d2c8e3-0692-4045-9592-3b01b49b07ed", translation, rotation}))
            await dispatch(loadPlayerSuccess())
        })
    }
  }

  useEffect(() => {
    load3kit(() => {
      setLoaded(true);
      init3kit();
    })
    
  })

  return (
    <div className={s.player_wrapper}>
      {loaded && <div id="player" className={s.player} ref={playerEl} />}
    </div>
  );
}

export default Player;