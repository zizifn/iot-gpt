import { getMiIOT, getMiNA } from "mi-service-lite";

const MI_DID="小爱音箱Pro";
async function main() {
  console.log("hello world!", process.env.MI_USER_ID);
  const config = {
    userId: process.env.MI_USER_ID!, // Xiaomi Account
    password: process.env.MI_PASSWORD!, // Account Password
    did: MI_DID, // Device ID or Name (optional - fill in after retrieving from the device list)
  };
  const MiNA = await getMiNA(config);
  const MiIOT = await getMiIOT(config);
  console.log("MiNA devices", await MiNA?.getDevices());

  const msgs = await MiNA?.getConversations({
    limit: 1
  })
  console.dir(msgs?.records ,  {depth: 10});
//   console.log("MiIOT devices", await MiIOT?.getDevices());
  // Find your device Spec here: https://home.miot-spec.com/
  await MiIOT?.doAction(5, 1, "Hello world, 你好！");
}

main();