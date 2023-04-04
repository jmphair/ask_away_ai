import React from "react";

function LightSwitchButton(props){
  
  const {light, switchLight} = props;

  const handleClick = () => switchLight();

  return (
    <div>
      <label class="switch">
        <input onClick={handleClick} className="LightSwitchButton" type="checkbox"/>
        <span class="slider round"></span>
      </label>
    </div>
  );
}

export default LightSwitchButton;