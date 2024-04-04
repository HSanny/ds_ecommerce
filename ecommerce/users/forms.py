"""
Used for defining Django forms which can be used for taking user input.
"""

from django import forms

# since we are using DRF, we are not using traditional forms anymore

# from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
# from .models import CustomUser

# # user registration form
# class CustomUserCreationForm(UserCreationForm):
    
#     # (Metadata is data that provides information about other data, but not the content of the data itself.)
#     # configure metadata 

#     class Meta(UserCreationForm.Meta):
#         # specify which model the form is linked
#         model = CustomUser
#         fields = (
#             # fields from CustomUser that should be included into the form
#             'email',
#             'username',
#             'phone_number',
#             'shipping_address',
#             'billing_address',
#             'default_shipping_method',
#         )

# class CustomAuthenticationForm(AuthenticationForm):
#     username = forms.EmailField(label='Email')