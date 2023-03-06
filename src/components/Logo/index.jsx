import React from "react";
import "./style.css";
function Logo() {
  return (
    <div class="container">
      <div class="coast">
        <div class="wave-rel-wrap">
          <div class="wave"></div>
        </div>
      </div>
      <div class="coast delay">
        <div class="wave-rel-wrap">
          <div class="wave delay"></div>
        </div>
      </div>
      <div class="text text-t">T</div>
      <div class="text text-o">O</div>
      <div class="text text-d">D</div>
      <div class="text text-o2">O</div>
    </div>
  );
}

export default Logo;
