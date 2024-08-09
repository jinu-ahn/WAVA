import React from "react";
import { Cursor } from "./Cursor";
import { useUsers } from "y-presence";
import { THROTTLE } from "./constants";
import throttle from "lodash.throttle";
import { awareness } from "./y";

export function Cursors() {
  const users = useUsers(awareness, (state) => state);

  // When the user moves their pointer, update their presence
  const handlePointMove = throttle((e) => {
    awareness.setLocalStateField("point", [e.clientX, e.clientY]);
  }, THROTTLE);

  return (
    <div className="cursors" onPointerMove={handlePointMove}>
      {Array.from(users.entries()).map(([key, value]) => {
        if (key === awareness.clientID) return null;
        return <Cursor key={key} color={value.color} point={value.point} />;
      })}
    </div>
  );
}
