import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import React, { Component ,useEffect } from "react";
import UserVideoComponent from "./UserVideoComponent";
import useUserStore from "../../store/userStore";

const UserStoreWrapper = (props) => {
  const userInfo = useUserStore((state) => state.userInfo);
  useEffect(() => {
    // 클래스 컴포넌트에 prop으로 전달
    props.setUserInfo(userInfo);
  }, [userInfo]);
  return null;
};
const OPENVIDU_SERVER_URL = process.env.REACT_APP_SERVER_ADDRESS;

class App extends Component {
  constructor(props) {

    super(props);
    const userInfo = props.userInfo || {};
    // 이 속성들은 state's 컴포넌트에 있어, 값이 변경될 때마다 HTML을 다시 렌더링합니다.
    this.state = {
      mySessionId: "1",  // ---------------------------------해당 모임채널 id가 들어가야합니다. 
      myUserName: userInfo.nickName,
      session: undefined,
      mainStreamManager: undefined, // 페이지의 메인 비디오. 'publisher'나 'subscribers' 중 하나가 될 것임.
      publisher: undefined,
      subscribers: [],
      userInfo: userInfo,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);

    
    
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onbeforeunload);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }



  async getToken() {
    const channelId = "1"; // <---------------------------------------------- 나중에 현재 모임채널의 아이디로 수정
    const sessionId = await this.createSession(channelId);

    let token = await this.createToken(sessionId);
    return token;
  }


  async createSession(channelId) {
    const response = await axios.post(
      `${OPENVIDU_SERVER_URL}/openvidu/create/session`,
      { customSessionId: channelId }
    );
    return response.data.data; // The sessionId
  }

  async createToken(sessionId) {
    const response = await axios.post(
      `${OPENVIDU_SERVER_URL}/openvidu/create/token`,
      { session: sessionId }
    );
    return response.data.data; // data.token -> data.data로 수정
  }

  joinSession() {
    // --- 1) OpenVidu 객체 가져오기 ---

    this.OV = new OpenVidu();

    // --- 2) 세션 초기화 ---

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;

        // --- 3) 세션에서 이벤트가 발생할 때의 동작 지정 ---

        // 새 스트림이 수신될 때마다...
        mySession.on("streamCreated", (event) => {
          // 스트림을 구독하여 수신합니다. 두 번째 매개변수가 정의되지 않으면
          // OpenVidu는 HTML 비디오를 단독으로 생성하지 않습니다.

          var sub = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          console.log(sub)
          subscribers.push(sub);

          // 새로운 구독자로 상태 업데이트
          this.setState({
            subscribers: subscribers,
          });
        });

        // 스트림이 파괴될 때마다...
        mySession.on("streamDestroyed", (event) => {
          // 'subscribers' 배열에서 스트림 제거
          this.deleteSubscriber(event.stream.streamManager);
        });

        // 비동기 예외가 발생할 때마다...
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        // --- 4) 유효한 사용자 토큰으로 세션에 연결 ---

        // OpenVidu 배포에서 토큰을 가져옵니다.
        this.getToken().then((token) => {
          // 첫 번째 매개변수는 OpenVidu 배포에서 가져온 토큰입니다. 두 번째 매개변수는 모든 사용자가 이벤트를 통해 검색할 수 있습니다.
          // 'streamCreated' (속성 Stream.connection.data)에서 DOM에 사용자 닉네임으로 추가됩니다.
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(async () => {
              // --- 5) 자신의 카메라 스트림 가져오기 ---

              // 타겟 요소로 undefined를 전달하여 퍼블리셔를 초기화합니다 (OpenVidu가 비디오 요소를 삽입하지 않도록 함)
              // 원하는 속성을 가진 퍼블리셔 초기화
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined, // 오디오 소스. 기본 마이크 사용 시 undefined
                videoSource: undefined, // 비디오 소스. 기본 웹캠 사용 시 undefined
                publishAudio: true, // 오디오를 음소거하지 않고 전송할지 여부
                publishVideo: true, // 비디오를 활성화하여 전송할지 여부
                resolution: "640x480", // 비디오 해상도
                frameRate: 30, // 비디오 프레임 레이트
                insertMode: "APPEND", // 비디오가 'video-container'에 삽입되는 방식
                mirror: false, // 로컬 비디오를 미러링할지 여부
              });

              // --- 6) 스트림 게시 ---

              mySession.publish(publisher);

              // 사용 중인 현재 비디오 장치 가져오기
              var devices = await this.OV.getDevices();
              var videoDevices = devices.filter(
                (device) => device.kind === "videoinput"
              );
              var currentVideoDeviceId = publisher.stream
                .getMediaStream()
                .getVideoTracks()[0]
                .getSettings().deviceId;
              var currentVideoDevice = videoDevices.find(
                (device) => device.deviceId === currentVideoDeviceId
              );

              // 페이지에서 웹캠을 표시하기 위해 메인 비디오를 설정하고 퍼블리셔 저장
              this.setState({
                currentVideoDevice: currentVideoDevice,
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch((error) => {
              console.log(
                "세션 연결 중 오류가 발생했습니다:",
                error.code,
                error.message
              );
            });
        });
      }
    );
  }

  leaveSession() {
    // --- 7) 세션 객체의 'disconnect' 메서드를 호출하여 세션을 종료 ---

    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // 모든 속성 비우기...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: "SessionA", //여기도 채널아이디로 바꿔야합니다,.
      myUserName: this.state.myUserName,
      mainStreamManager: undefined,
      publisher: undefined,
    });
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices();
      var videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // 특정 비디오 소스로 새로운 퍼블리셔 생성
          // 모바일 장치에서는 기본 및 첫 번째 카메라가 전면 카메라입니다.
          var newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          // newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(this.state.mainStreamManager);

          await this.state.session.publish(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice[0],
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;

    return (
      <div className="container">
        <UserStoreWrapper setUserInfo={async (userInfo) => await this.setState({ userInfo, myUserName: userInfo?.nickName })} />
        {this.state.session === undefined ? (
          
          <div id="join">
                    <div id="join-dialog" className="jumbotron vertical-center">
                        <h1> Join a video session </h1>
                        <form className="form-group" onSubmit={this.joinSession}>
                            <p>
                                <label>Participant: </label>
                                <span>{myUserName}</span>
                                {/* <input
                                    className="form-control"
                                    type="text"
                                    id="userName"
                                    value={myUserName}        
                                    onChange={this.handleChangeUserName}
                                    
                                    required
                                /> */}
                            </p>
                            <p>
                                <label> Session: </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="sessionId"
                                    value={mySessionId}
                                    onChange={this.handleChangeSessionId}
                                    required
                                />
                            </p>
                            <p className="text-center">
                                <input className="btn btn-lg btn-success" name="commit" type="submit" value="JOIN" />
                            </p>
                        </form>
                    </div>
                </div>
            ) : null}

            {this.state.session !== undefined ? (
                <div id="session" className="bg-black">
                    {/* {this.state.mainStreamManager !== undefined ? (
                        <div id="main-video" className="col-md-6">
                            <UserVideoComponent streamManager={this.state.mainStreamManager} />

                        </div>
                    ) : null} */}
                    <div id="video-container" className="col-lg-12 p-1">
                        {this.state.publisher !== undefined ? (
                            <div className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                                <UserVideoComponent
                                    streamManager={this.state.publisher} />
                            </div>
                        ) : null}
                        {this.state.subscribers.map((sub, i) => (
                            <div key={sub.id} className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(sub)}>
                                <UserVideoComponent streamManager={sub} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
                <div id="session-header" className="fixed bottom-0 h-10 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    {/* <h1 id="session-title">{mySessionId}</h1> */}
                    <button className="bg-red-600" onClick={this.leaveSession} id="buttonLeaveSession">
                    Leave session
                    </button>
                    {/* <input
                        className="btn btn-large btn-success"
                        type="button"
                        id="buttonSwitchCamera"
                        onClick={this.switchCamera}
                        value="Switch Camera"
                    /> */}
                </div>
        </div>
    );
}


}

export default App;
