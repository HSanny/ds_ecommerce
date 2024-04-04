from django.apps import AppConfig
"""
Contains the configuration class for your app.
You can set some configurations related to the app in this file, like verbose name.
"""

class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'
