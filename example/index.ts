import { createFireFly } from "../src";
import { TopicStruct } from "./event.type";

const fireFly = createFireFly<TopicStruct>();
fireFly.glow();
console.log(fireFly);
