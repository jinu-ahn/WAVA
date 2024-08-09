import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";

export default class UserVideoComponent extends Component {
  getNicknameTag() {
    // Gets the nickName of the user
    return JSON.parse(this.props.streamManager.stream.connection.data)
      .clientData;
  }

  render() {
    return (
      <>
        {this.props.streamManager !== undefined ? (
          <div className="relative inline-block" style={{ margin: "-4px" }}>
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
            {/* <div>
              <p>{this.getNicknameTag()}</p>
            </div> */}
            <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white text-start p-2 text-sm font-bold">
              <p>{this.getNicknameTag()}</p>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}
