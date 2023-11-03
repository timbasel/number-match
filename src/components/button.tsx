import { Component, ComponentProps } from "solid-js";
import { twMerge } from "tailwind-merge";

export const Button: Component<ComponentProps<"button">> = (props) => {
  return (
    <button
      {...props}
      class={twMerge(
        "flex items-center justify-center bg-white/20 p-4 hover:bg-white/25",
        props.class,
      )}
    />
  );
};
