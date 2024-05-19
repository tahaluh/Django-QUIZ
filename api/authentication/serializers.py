from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        user_uuid = str(user.uuid) if user.uuid else None

        token['user'] = {
            'uuid': user_uuid,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        }

        return token
