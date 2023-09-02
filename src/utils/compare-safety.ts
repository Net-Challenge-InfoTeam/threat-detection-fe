import Safety from "src/types/safety";
import Threat from "src/types/threat";

export const classifySafety = (threat: Threat): Safety => {
  return threat.kind === "칼" ? Safety.THREAT : Safety.CAUTION;
};

const safetyOrder = [Safety.NONE, Safety.SAFE, Safety.CAUTION, Safety.THREAT];

const compareSafety = (a: Safety, b: Safety) => {
  return safetyOrder.indexOf(b) - safetyOrder.indexOf(a);
};

export default compareSafety;
