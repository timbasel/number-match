/// <reference types="solid-start/env" />

import { Component } from "solid-js";

declare module "*.mdx" {
  let MDXComponent: Component;
  export default MDXComponent;
}
