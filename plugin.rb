# name: saml-auto-login
# version: 0.1.2
# author: Procourse Team
# url: https://github.com/procourse/discourse-saml-auto-login-plugin

enabled_site_setting :saml_auto_login_enabled

after_initialize {

  require_dependency "global_setting"
  GlobalSetting.register(:saml_auto_create_account, true)

}
