import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/auth/register": {};
  "/auth/log-in": {};
  "/auth/profile": {};
  "/info/menu": {};
  "/tracker": {};
};