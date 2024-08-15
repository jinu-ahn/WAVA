import callAssistant from "./gpt";
import datas from "./test-data";
import useTodoStore from "../store/todoStore";
import { getTodayTodoList } from "../api/todoApi";

// const dataString = "사용자의 하루 일정 정보는 " + JSON.stringify(datas) + " 입니다.";


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
        const todayEvents = await getTodayTodoList();

        const prompts = {
        "allDayTasks": "사용자의 하루 일정 정보와 아래의 문장을 참고해서 오늘 할 일을 브리핑 하세요. 할 일을 오전과 오후 나눠서 간단히 브리핑을 하고, 그 뒤에 중요도가 높은 업무들을 content 내용을 요약한 것도 포함해서 한 번 더 요약해서 제공하세요. 중요 일정들은 content를 요약한 내용과 중요도를 포함해서 작성하세요.",
        "toDoInfo": `
                        당신은 비서입니다. 요청을 비서처럼 수행해주세요.

                        현재 대한민국 서울 시각은 "YYYY-MM-DD hh:mm:ss"로 제공됩니다.
                        사용자의 하루 일정 정보는 아래와 같은 형태의 JSON 객체가 리스트로 묶여있는 형태로 제공됩니다.
                                                        {
                                                                "id" : Number,
                                                                "userId" : Number,
                                                                "content " : "string",  
                                                                "start" : "datetime",
                                                                "end" : "datetime",
                                                                "important" : "string",
                                                                "type" : "ENUM(WORK,REST)",
                                                                "className" : "string",
                                                                "isFinish" : "boolean",
                                                        }

                        아래에 현재 시각과 데이터를 제공해드리겠습니다.
                        
                        현재 대한민국 서울 시각은 "${getCurrentDate()}" 입니다.
                        사용자의 하루 일정 정보는
                        "${JSON.stringify(todayEvents)}"
                        입니다.

                        제공한 시간과 데이터를 기반으로 아래의 과정에 대한 답만 순서대로 출력해주세요. 대신 순서를 뜻하는 숫자는 제외하고 출력해주세요.

                        1. 현재 시간을 출력해주세요.
                        3. 사용자의 하루 일정 정보에서 "start" 키와 "end" 키의 시간을 확인하여 일정을 수행하고 있는 시간이라면 "현재 [수행하고 있는 일정]을 수행하고 있습니다." 와 응원 멘트를 함께 출력하세요.
                        4. 더이상 수행할 일정이 없다면 "오늘 하루 일정이 끝났습니다."와 격려 멘트를 함께 출력해주세요.
                        5. 만약 곧 시작할 일정을 찾아냈다면, 일정에 대한 정보를 리마인드하고, 해당 일정을 성공적으로 수행하기 위한 유용한 팁과 격려의 멘트를 아래 형식에 맞춰 제공하세요.
                        "현재 시각은 [YYYY-MM-DD hh:mm:ss]입니다.

                                                곧 시작할 일정을 말씀드리겠습니다.


                                                ##[일정 제목]

                                                내용: [일정 내용]

                                                시작 시간: [일정 시작 시간]

                                                종료 시간: [일정 종료 시간]

                                                중요도: [일정 중요도]


                                                ##성공적인 일정 수행을 위한 팁
                                                                    
                                                [성공적인 일정 수행을 위한 유용한 팁 제공]

                                                [격려의 멘트 제공]
                        "
                    `,
        "dailyReview": "사용자의 하루 일정 정보를 기반으로 하루 동안 수행한 일정을 work와 rest를 기준으로 일정 제목만 표현하여 간단하게 요약하고, 총 work 시간과 rest 시간을 각각 보여주세요. 만약 work 시간이 8시간을 넘어간다면 work과 rest의 균형도를 판단하여 내일의 일정 계획을 제안하세요.",
        "monthlyReview": "사용자의 월간 일정 정보를 기반으로 해당 월에 수행한 일정을 요약하고, 일과 여가 시간의 합계를 계산하여 제공하며, 중요 일정을 요약하여 제공하세요."
    };
    const events = useTodoStore.getState().events

    console.log(JSON.stringify(events))
    console.log(JSON.stringify(todayEvents))
    // const dataString = "사용자의 하루 일정 정보는 " + JSON.stringify(todayEvents) + " 입니다. 각 일정의 'start'와 'end'는 9시간을 더해서 표현해주세요";
    const dataString = "";
    // const now = "현재 시간은 " + getCurrentDate(false) + "입니다. "
    const now = ""

    if (isFirstVisit()) {
        return await showTodayTasks(dataString, prompts, now);
    }

    if (isEndOfDay()) {
        if (isEndOfMonth()) {
            return await showMonthlyReview(dataString, prompts, now);
        } else {
            return await showDailyReview(dataString, prompts, now);
        }
    }

    if (!isTaskRemaining()) {
        if (isEndOfMonth()) {
            return await showMonthlyReview(dataString, prompts, now);
        } else {
            return await showDailyReview(dataString, prompts, now);
        }
    } else {
        return await showToDoInfo(dataString, prompts, now);
    }
}

async function showTodayTasks(dataString, prompts, now) {
    const answerObject = await callAssistant(dataString, prompts.allDayTasks, now);
    return `${answerObject.choices[0].message.content}`;
}

async function showDailyReview(dataString, prompts, now) {
    const answerObject = await callAssistant(dataString, prompts.dailyReview, now);
    return `${answerObject.choices[0].message.content}`;
}

async function showMonthlyReview(dataString, prompts, now) {
    const answerObject = await callAssistant(dataString, prompts.monthlyReview, now);
    return `${answerObject.choices[0].message.content}`;
}

async function showToDoInfo(dataString, prompts, now) {

    const answerObject = await callAssistant(dataString, prompts.toDoInfo, now);
    return `${answerObject.choices[0].message.content}`;
}

function isFirstVisit() {
    return false;
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

    return true;
}

function getCurrentDate(isObject) {
    let today = new Date();   
    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    // DB에 -9시간으로 저장되어 있기 때문에 프롬프트 상에서 모든 시간을 +9 하라고 요청,
    // 여기서 현재 시간을 뽑을 때는 정상적인 한국시간으로 뽑히기 때문에 hours에 -9를 함
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