import { Heading, HStack, Spinner } from "@gluestack-ui/themed";
import React from "react";
import { View } from "react-native";
import styles from "./styles";

const FullScreenLoader: React.FC = () => {
  return (
    <View style={styles.container} testID="loader">
      <HStack space={"lg"} justifyContent="center">
        <Spinner accessibilityLabel="Loading" color={"blue"} size={24} />
        <Heading color={"blue"} fontSize={24}>
          Loading
        </Heading>
      </HStack>
    </View>
  );
};

export default FullScreenLoader;
