import { MiGPT } from "mi-gpt";
// import config from "./migpt.js"

const userId = process.env.MI_USER_ID || '';
const password = process.env.MI_PASSWORD || '';

async function main() {
  const client = MiGPT.create({
    speaker: {
      userId, // 注意：不是手机号或邮箱，请在「个人信息」-「小米 ID」查看
      password, // 账号密码
      did: "小爱音箱Pro", // 小爱音箱 ID 或在米家中设置的名称
      callAIKeywords:["请", "你", "傻妞"] // 小爱同学，请 xxx。这样就可以唤醒AI
    },
  });
  await client.start();
}

main();