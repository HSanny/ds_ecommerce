from django.contrib.auth.models import AbstractUser
from django.db import models
"""
This file is used to define the data models for your app.
Each class in models.py represents a database table, and the attributes represent fields in the database.
"""
# TODO: PurchaseHistory and Wishlist models 


# changing authenication behavior, use email instead of username

from django.contrib.auth.models import BaseUserManager
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifier
    for authentication instead of usernames.
    """
    def create_user(self, email, password, **extra_fields):
        if not email:
            # _('The Email must be set') marks the string as a translation string. 
            # If your application supports multiple languages, 
            # this string will be translated into the user's preferred language 
            # when it's displayed.
            raise ValueError(_('The email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, password, **extra_fields):
        # admin
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('superuser must have is_staff=True'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('superuser must have is_superuser=True'))
        
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username'] # email is not needed here as it's already username field

    objects = CustomUserManager() # use this custom manager as the manager for this model(users), such that you will be able to call CustomUser.objects.create_user()...
    phone_number = models.CharField(max_length=15, blank=True)
    shipping_address = models.TextField(blank=True)
    billing_address = models.TextField(blank=True)
    default_shipping_method = models.CharField(max_length=50, blank=True)

    # loyalty_points = models.IntegerField(default=0)
    # preferred_payment_method = models.CharField(max_length=50, blank=True)
    # purchase_history = models.ForeignKey(PurchaseHistory, on_delete=models.SET_NULL, null=True)
    # wishlist = models.ForeignKey(Wishlist, on_delete=models.SET_NULL, null=True)

    # marketing_opt_in = models.BooleanField(default=False)
    # User preferences for various types of notifications (e.g., out-of-stock items, promotions).    
    # notification_preferences = models.JSONField(default=dict)  # Requires Django 3.1+

    # account_verified = models.BooleanField(default=False) # fraud preventation
    # account_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    # ... any additional fields ...

    def __str__(self):
        return self.email # return primary identifier