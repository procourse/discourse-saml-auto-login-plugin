import { withPluginApi } from "discourse/lib/plugin-api";
import { observes, on } from "ember-addons/ember-computed-decorators";
import ApplicationRoute from "discourse/routes/application";
import CreateAccountController from "discourse/controllers/create-account";
import { getOwner } from "discourse-common/lib/get-owner";

function initWithApi(api) {

  ApplicationRoute.on("activate", function() {
    const currentUser = api.getCurrentUser();

    if (!currentUser && Discourse.SiteSettings.saml_auto_login_enabled) {
      getOwner(this).lookup("route:application").send("showLogin");
    }
  });

  CreateAccountController.reopen({
    autoLoginExecuted: false,

    @on("init")
    _notifyAutoLoginObserver() {
      if (!this.siteSettings.saml_auto_login_enabled) return;

      Ember.run.schedule("afterRender", this, () => {
        this.notifyPropertyChange("submitDisabled")
      });
    },

    // assuming the form will be auto-populated
    // this only will be executed once
    @observes("submitDisabled")
    _fireSubmitButton() {
      if (!this.siteSettings.saml_auto_login_enabled) return;

      if (!this.get("submitDisabled") && !this.get("autoLoginExecuted")) {
        this.send("createAccount");
      }
    }

  });

}

export default {
  name: "extend-for-saml-auto-login",
  initialize() { withPluginApi("0.1", initWithApi); }
};
