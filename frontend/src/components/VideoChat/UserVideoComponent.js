import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";
import { PhoneXMarkIcon } from "@heroicons/react/24/outline";

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
          <div
            className="relative inline-block group"
            style={{ margin: "-4px" }}
          >
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
            <div className="absolute top-0 left-8 bg-black bg-opacity-50 text-white text-start p-2 text-sm font-bold">
              <p>{this.getNicknameTag()}</p>
            </div>
            {this.props.isPublisher && (
              <div className="absolute top-0 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-2 rounded-md inline-flex items-center"
                  onClick={this.props.leaveSession}
                >
                  <PhoneXMarkIcon className="h-5 w-5 mr-2" />
                  통화 종료
                </button>
              </div>
            )}
          </div>
        ) : null}
      </>
    );
  }
}
