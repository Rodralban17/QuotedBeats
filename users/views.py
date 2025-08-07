# users/views.py
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User # Ensure User is imported if not already
from .serializers import RegisterSerializer, UserInfoSerializer, CustomTokenObtainPairSerializer # Import new serializer

# This view handles user registration.
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

# This custom LoginView handles authentication and sets JWT tokens as HTTP-only cookies.
class LoginView(APIView):
    permission_classes = (AllowAny,)
    serializer_class = CustomTokenObtainPairSerializer # Use our custom token serializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        
        try:
            # Validate the serializer data. This will trigger the CustomTokenObtainPairSerializer's
            # validate method, which handles username/email authentication.
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            # If validation fails, return a bad request response with the error details.
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

        # If validation is successful, extract the access and refresh tokens.
        access_token = serializer.validated_data['access']
        refresh_token = serializer.validated_data['refresh']
        
        # The authenticated user object is available via serializer.user after successful validation.
        user = serializer.user 
        
        # Serialize the user information to send back to the frontend (excluding password).
        user_info_serializer = UserInfoSerializer(user)
        user_info = user_info_serializer.data

        # Calculate max_age for the cookies (7 days in seconds), matching your Express.js logic.
        max_age_seconds = 60 * 60 * 24 * 7 

        # Create the response object that will be sent back to the client.
        response = Response(user_info, status=status.HTTP_200_OK)
        
        response.set_cookie(
            key='access_token', 
            value=access_token, 
            httponly=True, 
            max_age=max_age_seconds,
            # secure=True, # Uncomment and set to True in production with HTTPS
            samesite='Lax' 
        )
        
        # Set the refresh token as an HTTP-only cookie.
        response.set_cookie(
            key='refresh_token', 
            value=refresh_token, 
            httponly=True, 
            max_age=max_age_seconds,
            # secure=True, # Uncomment and set to True in production with HTTPS
            samesite='Lax'
        )
        
        return response

