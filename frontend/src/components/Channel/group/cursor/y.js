import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

export const ydoc = new Y.Doc();

export const provider = new WebsocketProvider(
  "ws://localhost:8080/api/ws",
  "y-presence_perfect-cursors",
  ydoc
);

export const awareness = provider.awareness;
