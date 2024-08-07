import callAssistant from "./gpt";
import datas from "./test-data";


const prompts = {
    "allDayTasks": "사용자의 하루 일정 정보와 아래의 문장을 참고해서 오늘 할 일을 브리핑 하세요. 할 일을 오전과 오후 나눠서 간단히 브리핑을 하고, 그 뒤에 중요도가 높은 업무들을 content 내용을 요약한 것도 포함해서 한 번 더 요약해서 제공하세요. 중요 일정들은 content를 요약한 내용과 중요도를 포함해서 작성하세요.",
    "toDoInfo": "현재 대한민국 서울 시각을 알려주고, 대한민국 서울 시각과 사용자의 일정 정보를 기반으로 곧 시작할 일정에 대한 정보를 리마인드하고, 해당 일정을 성공적으로 수행하기 위한 유용한 팁과 격려의 멘트를 제공하세요.",
    "dailyReview": "사용자의 하루 일정 정보를 기반으로 하루 동안 수행한 일정을 work와 rest를 기준으로 요약하고, 일과 휴식의 균형도를 판단하여 내일의 일정 계획을 제안하세요. 이 때 하루 적정 work 수행 시간은 8시간을 기준으로 하세요.",
    "monthlyReview": "사용자의 월간 일정 정보를 기반으로 해당 월에 수행한 일정을 요약하고, 일과 여가 시간의 합계를 계산하여 제공하며, 중요 일정을 요약하여 제공하세요."
};

const dataString = "사용자의 하루 일정 정보는 " + JSON.stringify(datas) + " 입니다.";
const now = "현재 시간은 " + getCurrentDate(false) + "입니다. "

// function mainLogic() {

//     const answerObject = null;
//     if (isFirstVisit()) {
//         showTodayTasks();
//     } else {
//         if (isEndOfDay()) {
//             if (isEndOfMonth()) {
//                 showMonthlyReview();
//             } else {
//                 showDailyReview();
//             }
//         } else {
//             if (!isTaskRemaining()) {
//                 if (isEndOfMonth()) {
//                     showMonthlyReview();
//                 } else {
//                     showDailyReview();
//                 }
//             } else {
//                 showToDoInfo();
//             }
//         }
//     }

// }

async function mainLogic() {

    if (isFirstVisit()) {
        return await showTodayTasks();
    }

    if (isEndOfDay()) {
        if (isEndOfMonth()) {
            return await showMonthlyReview();
        } else {
            return await showDailyReview();
        }
    }

    if (!isTaskRemaining()) {
        if (isEndOfMonth()) {
            return await showMonthlyReview();
        } else {
            return await showDailyReview();
        }
    } else {
        return await showToDoInfo();
    }
}

async function showTodayTasks() {
    const answerObject = await callAssistant(dataString, prompts.allDayTasks, now);
    return `${answerObject.choices[0].message.content}`;
}

async function showDailyReview() {
    const answerObject = await callAssistant(dataString, prompts.dailyReview, now);
    return `${answerObject.choices[0].message.content}`;
}

async function showMonthlyReview() {
    const answerObject = await callAssistant(dataString, prompts.monthlyReview, now);
    return `${answerObject.choices[0].message.content}`;
}

async function showToDoInfo() {

    const answerObject = await callAssistant(dataString, prompts.toDoInfo, now);
    return `${answerObject.choices[0].message.content}`;
}

function isFirstVisit() {
    return true;
}

 function isEndOfDay() {
    // const currentTime = new Date();
    // if (currentTime.getHours() >= 22) {
    //     return true;
    // } else {
    //     return false;
     // }
     return false;
}

function isTaskRemaining() {
    // todo: 오늘 일정이 더 남았는지..
    
    // let today = new Date();   
    // let year = today.getFullYear();
    // let month = ('0' + (today.getMonth() + 1)).slice(-2);
    // let day = ('0' + today.getDate()).slice(-2);
    // let hours = ('0' + today.getHours()).slice(-2); 
    // let minutes = ('0' + today.getMinutes()).slice(-2);
    // let seconds = ('0' + today.getSeconds()).slice(-2); 
    // let nowTime = year + '-' + month  + '-' + day + " " + hours + ':' + minutes  + ':' + seconds;

    // const now = new Date(nowTime);
    const now = getCurrentDate(true);
    const taskNum = datas.length;

    if (taskNum === 0) return false;

    for (let i = taskNum - 1; i >= 0; i--) {
        if (new Date(datas[i].start) >= now) return true;
    }

    return false;
}

function getCurrentDate(isObject) {
    let today = new Date();   
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    let hours = ('0' + today.getHours()).slice(-2); 
    let minutes = ('0' + today.getMinutes()).slice(-2);
    let seconds = ('0' + today.getSeconds()).slice(-2); 
    let nowTime = year + '-' + month  + '-' + day + " " + hours + ':' + minutes  + ':' + seconds;

    const now = new Date(nowTime);

    if (isObject) {
        return now;
    } else {
        return nowTime;
    }
}

function isEndOfMonth() {
    // const currentTime = new Date();
    // const currentYear = currentTime.getFullYear();
    // const currentMonth = currentTime.getMonth() + 1;
    // const currentDate = currentTime.getDate();

    // const currentLastDate = new Date(currentYear, currentMonth, 0).getDate();

    // if (currentDate === currentLastDate) {
    //     return true;
    // } else {
    //     return false;
    // }
    return false;
}

export default mainLogic;