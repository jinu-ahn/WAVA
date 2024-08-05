import { localAxios as local } from "../util/http-commons";

async function fetchChat(channelId, success, fail) {
    await local.get(`/chat/logs/${channelId}`).then(success).catch(fail);
}

export default fetchChat;