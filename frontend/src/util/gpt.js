import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

async function callAssistant(todoList, prompt, currentTime) {
    const completion = await openai.chat.completions.create({
        messages: [
            { "role": "system", "content": "당신은 사용자의 일정 관리를 돕는 비서입니다." },
            { "role": "system", "content": "요청에 대한 출력 언어는 한국어로 하세요." },
            { "role": "system", "content": "출력 형식은 문단을 나눠서 텍스트로 해주세요." },
            { "role": "system", "content": currentTime},
            { "role": "user", "content": prompt },
            { "role":"user", "content": todoList }
        ],
        model: "gpt-4o-mini"
    });
    console.log(completion);
    return completion;
}


export default callAssistant;