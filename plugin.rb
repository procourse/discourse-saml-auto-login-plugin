# name: saml-auto-login
# version: 0.1.1
# author: Procourse Team
# url: https://github.com/procourse/discourse-saml-auto-login-plugin

enabled_site_setting :saml_auto_login_enabled

register_asset "stylesheets/saml-auto-login.scss"

after_initialize {

  # noop

}
