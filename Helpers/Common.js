import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export const hp = (pre) => {
  return (pre * deviceHeight) / 100;
};
export const wp = (pre) => {
  return (pre * deviceWidth) / 100;
};
