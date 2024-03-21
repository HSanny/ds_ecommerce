from django.urls import include, path
from . import views

# In this file, 
# you define the URL patterns for your app. 
# The path() function is used to associate a URL pattern (in this case amazon_products/) with a view function (views.amazon_products_list). 
# When a user navigates to /amazon_products/ on your website, 
# Django will execute the amazon_products_list function.

urlpatterns = [
    path(
        'amazon_products/',
        views.amazon_products_list,
        name="amazon_products_list"
    ),
    path(
        'csrfToken/',
        views.csrf_token,
        name="csrf_token"
    ),
    path(
        'data_summary/',
        views.get_data_summary,
        name="data_summary"
    )
]