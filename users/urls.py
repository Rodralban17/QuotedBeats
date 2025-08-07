# users/urls.py
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, LoginView # Import the new LoginView

# Define the URL patterns for the users app.
urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    
    # Use our new custom LoginView for the token endpoint
    path('login/', LoginView.as_view(), name='token_obtain_pair'),
    
    # The default TokenRefreshView. If you also want to set the refreshed
    # access token as a cookie, you would need to create a custom view
    # for refresh similar to LoginView.
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
