import { withPluginApi } from "discourse/lib/plugin-api";
import ApplicationRoute from "discourse/routes/application";
import { getOwner } from "discourse-common/lib/get-owner";

function initWithApi(api) {

  ApplicationRoute.on("activate", function() {
    const currentUser = api.getCurrentUser();

    if (!currentUser && Discourse.SiteSettings.saml_auto_login_enabled) {
      getOwner(this).lookup("route:application").send("showLogin");
    }
  });

}

export default {
  name: "extend-for-saml-auto-login",
  initialize() { withPluginApi("0.1", initWithApi); }
};
