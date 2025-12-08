import Keycloak from "keycloak-js";

export const keycloak = new Keycloak({
  url: "https://auth.ht-innovations.com",
  realm: "dev",
  clientId: "test-web-client",
});
