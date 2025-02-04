import React, { FC } from "react";
import { Controller, FieldError, useFormContext } from "react-hook-form";

import { Input, InputField, InfoIcon, Text } from "@gluestack-ui/themed";
import { View } from "@gluestack-ui/themed";

type GluestackTextFieldProps = React.ComponentProps<typeof InputField>;

interface CustomButtonProps extends Omit<GluestackTextFieldProps, "children"> {
  isLoading?: boolean;
  error?: FieldError | undefined;
  name: string;
  isDisabled?: boolean;
  placeholder: string;
  prefix?: string;
}

const TextField: FC<CustomButtonProps> = ({
  defaultValue = "",
  isLoading,
  error,
  name,
  isDisabled,
  placeholder = "",
  prefix,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <View flex={1}>
            <Input
              borderColor="black"
              variant="outline"
              borderWidth={1}
              h={52}
              w={"100%"}
              isReadOnly={isDisabled}
            >
              <InputField
                marginRight={15}
                value={value}
                color={"$black"}
                placeholder={placeholder}
                onChangeText={(formatted: string) => {
                  if (!value && prefix) {
                    onChange(`${prefix} ${formatted}`);
                  } else {
                    onChange(formatted);
                  }
                }}
                {...props}
              />
            </Input>

            {error && (
              <View>
                <InfoIcon color="red" />
                <Text color={"red"}>{error.message}</Text>
              </View>
            )}
          </View>
        );
      }}
      name={name}
      defaultValue={defaultValue}
    />
  );
};

export default TextField;
