import colorSet from "src/styles/colorSet";
import Safety from "src/types/safety";

const getIconColor = (safety: Safety) => {
  switch (safety) {
    case Safety.SAFE:
      return colorSet.primary;
    case Safety.CAUTION:
      return colorSet.caution;
    case Safety.THREAT:
      return colorSet.threat;
    default:
      return colorSet.secondaryText;
  }
};

export default getIconColor;
