# users/serializers.py
from django.contrib.auth import get_user_model
from rest_framework import serializers
# from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()
# This serializer handles the data validation and creation of a new user.
# It uses Django's built-in User model.
class RegisterSerializer(serializers.ModelSerializer):
    # The email field, now with a unique validator.
    # This ensures no two users can register with the same email.
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(),
        message="This username is already in use please kindly take another one"
        )]
    )

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(),
        message="This email is already in use"
        )]
    )

    # A write-only field for password, so it's not included in read operations.
    password = serializers.CharField(
        write_only=True, required=True, style={'input_type': 'password'}
    )
    # A second password field to confirm the password.
    password2 = serializers.CharField(
        write_only=True, required=True, style={'input_type': 'password'}
    )

    class Meta:
        model = User
        # Define the fields to be included in the serializer.
        # 'password2' is for validation and is handled below.
        fields = ('username', 'email', 'password', 'password2')
        # We can now remove the extra_kwargs for email since we
        # defined it explicitly above.

    # This validation method is called after individual field validation.
    # It checks if the two password fields match.
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )
        return attrs

    # This method is used to create a new user object.
    # It correctly hashes the password using create_user()
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['is_admin'] = user.is_staff or user.is_superuser
        return token

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if not username:
            raise serializers.ValidationError(
                {"username": "This field is required."}
            )

        if '@' in username:
            try:
                user = User.objects.get(email=username)
            except User.DoesNotExist:
                pass # Let the default authentication handle invalid credentials
            else:
                attrs[self.username_field] = user.username
        
        # Call the parent's validate method which performs the actual authentication
        # and sets self.user if authentication is successful.
        data = super().validate(attrs)
        return data

# This serializer is used to return selected user information to the frontend.
class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # Specify the fields you want to include in the user info response.
        # Ensure 'password' is NOT included here.
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_superuser')

