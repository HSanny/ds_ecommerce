from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import CustomUser

# registration
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            'email',
            'username',
            'password',
            'phone_number',
            'shipping_address',
            'billing_address',
            'default_shipping_method',
        )
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        return super(CustomUserSerializer, self).create(validated_data)
    
# # login
    
"""
In the context of session-based authentication 
using Django's traditional server-rendered views, 
a LoginSerializer is not typically necessary. 
This is because in such a setup, 
the authentication process generally involves 
standard Django forms or handling request data directly, 
rather than processing JSON data as you would in a REST API.
"""
# class LoginSerializer(serializers.Serializer):
#     email = serializers.EmailField()
#     password = serializers.CharField()