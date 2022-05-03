import React, { useState, useEffect } from "react";
import { Button, useMantineTheme } from "@mantine/core";
import { MakeAnimated } from "../Animation/animation";

const StyledButton = (props) => {
  const { children } = props;
  const theme = useMantineTheme();

  return (
    <Button
      radius="xl"
      size="md"
      sx={(theme) => ({
        padding: "0 40px",
        backgroundColor: `${theme.colors.primary[5]} !important`,
        transition: "all 0.3s ease-in-out",
        transitionProperty: "opacity, transform",
        "&:hover": {
          opacity: "0.8",
          transform: "scale(1.05)",
        },
      })}
    >
      {children}
    </Button>
  );
};

function CustomButton(props) {
  const { children, onButtonClick } = props;

  return (
    <MakeAnimated
      className="button-container overflow-hidden rounded-2xl"
      animation="ripple"
      color="#eee"
      size={5}
      delay={500}
      action={onButtonClick}
    >
      <StyledButton>{children}</StyledButton>
    </MakeAnimated>
  );
}

export default CustomButton;
