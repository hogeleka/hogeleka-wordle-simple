import { FunctionComponent, useState, MutableRefObject } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { KEYBOARD_LAYOUT_LOWERCASE, KEYBOARD_LAYOUT_UPPERCASE, USE_UPPER_CASE } from "./utilsAndConstants";

interface IProps {
  onKeyPress: (input: string) => void;
}

const KeyboardWrapper: FunctionComponent<IProps> = ({
  onKeyPress
}) => {
  const [layoutName, setLayoutName] = useState("default");

  return (
      <div style={{maxWidth: "500px", minWidth: "300px", width: "100%", margin: "auto"}}>
         <Keyboard
            layoutName={layoutName}
            layout={ USE_UPPER_CASE ? KEYBOARD_LAYOUT_UPPERCASE : KEYBOARD_LAYOUT_LOWERCASE}
            onKeyPress={onKeyPress}
            onRender={() => console.log("Rendered")}
        />
      </div>
   
  );
};

export default KeyboardWrapper;
