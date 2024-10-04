import { getMiIOT, getMiNA } from "mi-service-lite";

const MI_DID="小爱音箱Pro";
const msg = new Map<string, any>()
async function main() {
  console.log("hello world!", process.env.MI_USER_ID);
  const config = {
    userId: process.env.MI_USER_ID!, // Xiaomi Account
    password: process.env.MI_PASSWORD!, // Account Password
    did: MI_DID, // Device ID or Name (optional - fill in after retrieving from the device list)
  };
  const MiNA = await getMiNA(config);
  // await MiNA?.play(
  //   {
  //       tts: '你好，我是小爱同学，有什么可以帮助你的吗？',
  //   }
  // )
  const MiIOT = await getMiIOT(config);
//   console.log("MiNA devices", await MiNA?.getDevices());

  setInterval(async () => {
    const msgs = await MiNA?.getConversations({
        limit: 1
      })
      console.dir(msgs?.records ,  {depth: 10});
      const requestId = msgs?.records[0]?.requestId|| ''
      if(!msg.has(requestId)){
        msg.set(msgs?.records[0]?.requestId|| '', msgs?.records[0]);
        const tts = msgs?.records[0]?.answers.find((a: any) => a.type === 'TTS') || '';
        console.log('---------', tts);
        // openai
        await MiIOT?.doAction(5, 1, `回答已经被截断，我的上一个问题是，${msgs?.records[0]?.query}. 答案是：${tts.tts.text}`);
      }
  }, 1000);


//   console.log("MiIOT devices", await MiIOT?.getDevices());
//   await MiIOT?.doAction(2,2, 'true');
  // Find your device Spec here: https://home.miot-spec.com/
  
}

main();