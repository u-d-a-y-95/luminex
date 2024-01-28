import { born } from "../src";
import { TopicStruct } from "./event.type";

const firefly = born<TopicStruct>();
const a = firefly.glow("SHOW", (data) => {
  console.log("from a", data);
});
const b = firefly.blink("SHOW", (data) => {
  console.log(data);
});
firefly.fly("SHOW", { name: "uday" });

a.kill();
firefly.fly("SHOW", { name: "uday" });
