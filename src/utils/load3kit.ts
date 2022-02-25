const load3kit = (callback: () => void) => {
  const existingScript = document.getElementById("threekit");

  if (!existingScript) {
    const script = document.createElement("script");
    script.src = "https://preview.threekit.com/app/js/threekit-player.js";
    script.id = "threekit";
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  }

  let interval: ReturnType<typeof setInterval> | null = null;
  const callbackIfExist = () => {
    if (!window.threekitPlayer) return false;

    if(interval) {
			clearInterval(interval);
		}
    callback();
  };

  if (existingScript && callback) {
    callbackIfExist();
    interval = setInterval(() => {
      callbackIfExist();
    }, 50);
  }
};

export default load3kit;
