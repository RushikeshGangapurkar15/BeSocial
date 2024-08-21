import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { theme } from "../../constants/theme";
import {
  Home,
  Lock,
  Mail,
  User,
  Heart,
  Plus,
  Search,
  Location,
  Call,
  Camera,
  Edit,
  ArrowLeft,
  ThreeDotCircle,
  ThreeDotHorizontalCircle,
  Comment,
  Share,
  Send,
  Delete,
  Logout,
  Image,
  Video,
} from "./CustomeIcons";

const iconsdata = {
  home: Home,
  mail: Mail,
  lock: Lock,
  user: User,
  heart: Heart,
  plus: Plus,
  search: Search,
  location: Location,
  call: Call,
  camera: Camera,
  edit: Edit,
  back: ArrowLeft,
  threedot: ThreeDotCircle,
  threedotHorizontal: ThreeDotHorizontalCircle,
  comment: Comment,
  share: Share,
  send: Send,
  delete: Delete,
  logout: Logout,
  image: Image,
  video: Video,
};

const Icon = ({ name, ...props }) => {
  const IconComponent = iconsdata[name];
  return (
    <IconComponent
      height={props.size || 24}
      weidth={props.size || 24}
      strokeWidth={props.strokeWidth || 1.9}
      color={theme.colors.textLight}
      {...props}
    />
  );
};

export default Icon;
