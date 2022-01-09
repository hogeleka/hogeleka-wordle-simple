import { FunctionComponent, useState, MutableRefObject } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { KEYBOARD_LAYOUT } from "./utilsAndConstants";

interface IProps {
  onKeyPress: (input: string) => void;
}

const KeyboardWrapper: FunctionComponent<IProps> = ({
  onKeyPress,
}) => {
  const [layoutName, setLayoutName] = useState("default");

  return (
      <div style={{maxWidth: "500px", minWidth: "300px", width: "100%", margin: "auto"}}>
         <Keyboard
            layoutName={layoutName}
            layout={KEYBOARD_LAYOUT}
            onKeyPress={onKeyPress}
            onRender={() => console.log("Rendered")}
        />
      </div>
   
  );
};

export default KeyboardWrapper;
