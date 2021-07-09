import Toast from "react-native-root-toast";

type optionsProps = {
  durationShort?: boolean,
  position?: number,
  shadow?: boolean,
  animation?: boolean,
  hideOnPress?: boolean,
  delay?: number,
  opacity?: number,
  textColor?: string,
  backgroundColor?: string,
  shadowColor?: string,
};

type eventsProps = {
  // appear animation start
  onShow?: Function|undefined,
  // appear animation end
  onShown?: Function|undefined,
  // disappear animation start
  onHide?: Function|undefined,
  // disappear animation end
  onHidden?: Function|undefined,
}


const _defaults = {
  message: "No message defined!",
  options: {
    duration: 3500,
    position: 14,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    opacity: 0.8,
    textColor: undefined,
    backgroundColor: "#4630EB",
    shadowColor: undefined,
  },
  events: {
    // appear animation start
    onShow: undefined,
    // appear animation end
    onShown: undefined,
    // disappear animation start
    onHide: undefined,
    // disappear animation end
    onHidden: undefined,
  }
}

const showToast = (
  message: string,
  optionsArg: optionsProps|undefined = undefined ,
  eventsArg: eventsProps|undefined = undefined,
) => {
  const options = Object.assign({}, _defaults.options,  optionsArg);
  const events = Object.assign({}, _defaults.events, eventsArg);

  console.log("showToast - options/events\n", options,"\n", events);
  let toast = Toast.show(
    message ? message : _defaults.message,
    {
      //SHORT=2000, LONG=3500, DEFAULT=3500
      duration: options.duration ,
      // TOP=20, BOTTOM=-20, CENTER=0
      position: options.position,
      shadow: options.shadow,
      hideOnPress: options.hideOnPress,
      delay: options.delay,
      opacity: options.opacity,
      textColor: options.textColor,
      backgroundColor: options.backgroundColor,
      shadowColor: options.shadowColor,
      // appear animation start
      onShow: events.onShow,
      // appear animation end
      onShown: events.onShown,
      // disappear animation start
      onHide: events.onHide,
      // disappear animation end
      onHidden: events.onHidden,
    }
  );

  /* You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
  setTimeout(function () {
    Toast.hide(toast);
  }, 500);
   */
};

export default showToast;
