import { HStack } from "@gluestack-ui/themed";
import React, { FC, ReactNode } from "react";

interface CustomHeaderProps {
  children?: ReactNode;
}

const CustomHeader: FC<CustomHeaderProps> = ({ children }) => {
  return (
    <HStack
      justifyContent="space-between"
      borderBottomWidth={1}
      borderBottomColor="gray"
      gap={12}
      py={16}
      alignItems="center"
    >
      {children}
    </HStack>
  );
};

export default CustomHeader;
