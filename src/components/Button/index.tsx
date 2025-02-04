import React, { FC } from "react";
import { Button, ButtonText, Spinner } from "@gluestack-ui/themed";

type GluestackButtonProps = React.ComponentProps<typeof Button>;

interface CustomButtonProps extends Omit<GluestackButtonProps, "children"> {
  children: React.ReactNode;
  textColor?: string;
  isLoading?: boolean;
}

const CustomButton: FC<CustomButtonProps> = ({
  children,
  textColor,
  isLoading,
  ...props
}) => {
  return (
    <Button h={52} width={"100%"} {...props}>
      {isLoading ? (
        <Spinner />
      ) : (
        <ButtonText color={textColor || "white"}>{children}</ButtonText>
      )}
    </Button>
  );
};

export default CustomButton;
