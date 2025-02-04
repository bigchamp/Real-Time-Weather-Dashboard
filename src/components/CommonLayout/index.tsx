import React, { ReactNode } from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { VStack } from "@gluestack-ui/themed";

interface CommonLayoutProps {
  children: ReactNode;
  paddingHorizontal?: boolean | true;
}

const CommonLayout = ({ children, paddingHorizontal }: CommonLayoutProps) => {
  const { top, bottom } = useSafeAreaInsets();
  const paddingStyle = {
    paddingTop: Platform.OS === "ios" ? top : top + 15,
    paddingBottom: Platform.OS === "ios" ? bottom + 5 : bottom + 15,
  };
  return (
    <VStack
      flex={1}
      paddingHorizontal={!paddingHorizontal ? 16 : 0}
      style={paddingStyle}
    >
      {children}
    </VStack>
  );
};

export default CommonLayout;
