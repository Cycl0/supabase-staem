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
        height: "40px",
        padding: "0 30px",
        backgroundColor: `${theme.colors.primary[5]} !important`,
        transition: "all 0.3s ease-in-out",
        transitionProperty: "opacity, transform",
        "&:hover": {
          opacity: "0.7",
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
      color="#fff"
      size={5}
      delay={500}
      action={onButtonClick}
    >
      <StyledButton>{children}</StyledButton>
    </MakeAnimated>
  );
}

export default CustomButton;
