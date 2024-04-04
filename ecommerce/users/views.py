from django.shortcuts import render
"""
Contains the view functions or view classes for your app.
Views handle the request-response cycle for your application. They fetch data from models and pass it to templates.
"""
# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import CustomUserSerializer

@api_view(['POST'])
def register(request):
    serializer = CustomUserSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # traditional way of django reg 
    # if request.method == 'POST':
    #     form = CustomUserCreationForm(request.POST)
    #     if form.is_valid():
    #         form.save()
    #         return redirect('login') # redirect to login page after registration
        
    #     else:
    #         form = CustomUserCreationForm()
        
    #     return render(request, 'users/register.html', {'form': form})

from django.contrib.auth import authenticate, login
from django.http import JsonResponse

def login_view(request):
    # Django's built-in authentication system
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(
            email = email,
            password = password
        )
        if user is not None:
            # token-based or session-based
            # session-based authentication for security reason
            login(request, user)
            return JsonResponse(
                {"message": "Login successfully"},
                status = 200
            )

        else:
            return JsonResponse(
                {"error": "Invalid credentials"},
                status=401
            )
    return JsonResponse({"error": "Invalid request"}, status=400)

from django.contrib.auth import logout

def logout_view(request):
    logout(request)
    return JsonResponse({"message": "Logged out successfully"})