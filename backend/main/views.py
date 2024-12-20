from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import hashlib
from datetime import datetime, timedelta
from django.utils.timezone import now
from .models import UrlMapping  
from django.shortcuts import redirect
from dateutil.parser import parse as parse_date  # Import dateutil for flexible date parsing

class UrlGeneration(APIView):
    def post(self, request):
        """
        POST method to handle URL shortening with improved date handling.
        """
        long_url = request.data.get("long_url")
        short_url_id = request.data.get("short_url_id")  # Optional custom alias
        expiration_date = request.data.get("expiration_date")  # Optional expiration date

        # Validate the 'long_url'
        if not long_url:
            return Response({"error": "The 'long_url' field is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Validate and parse 'expiration_date'
        if expiration_date:
            try:
                # Try parsing with dateutil for multiple format support
                expiration_date = parse_date(expiration_date)
                if expiration_date <= now():
                    return Response(
                        {"error": "The 'expiration_date' must be in the future."},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            except (ValueError, OverflowError):
                return Response(
                    {"error": (
                        "Invalid 'expiration_date' format. Supported formats include: "
                        "'YYYY-MM-DD', 'YYYY-MM-DDTHH:MM:SS', or other common date formats."
                    )},
                    status=status.HTTP_400_BAD_REQUEST
                )
        else:
            # Default expiration: 90 days from now
            expiration_date = now() + timedelta(days=90)

        # Handle short URL generation (same logic as your original code)
        if short_url_id:
            # Check if custom alias already exists
            if UrlMapping.objects.filter(short_url_id=short_url_id).exists():
                return Response(
                    {"error": f"The alias '{short_url_id}' is already in use."},
                    status=status.HTTP_409_CONFLICT
                )
        else:
            # Generate a short URL ID
            hash_object = hashlib.md5(long_url.encode())
            truncated_hash = hash_object.hexdigest()[:12]
            decimal_value = int(truncated_hash, 16)
            short_url_id = self.base62_encode(decimal_value)[:7]

            # Check for collisions
            suffix = 0
            original_short_url_id = short_url_id
            while UrlMapping.objects.filter(short_url_id=short_url_id).exists():
                suffix += 1
                short_url_id = f"{original_short_url_id}-{suffix}"
                if suffix > 10:
                    return Response(
                        {"error": "Unable to generate a unique short URL due to repeated collisions."},
                        status=status.HTTP_409_CONFLICT
                    )

        # Save to database
        url_mapping = UrlMapping.objects.create(
            short_url_id=short_url_id,
            long_url=long_url,
            expiration_date=expiration_date
        )

        return Response({
            "short_url_id": short_url_id,
            "long_url": long_url,
            "expiration_date": expiration_date.isoformat()
        }, status=status.HTTP_201_CREATED)

    @staticmethod
    def base62_encode(num):
        """
        Encodes a decimal number to Base62 string.
        """
        characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        base = len(characters)
        encoded = []
        while num > 0:
            encoded.append(characters[num % base])
            num //= base
        return ''.join(reversed(encoded))


class UrlRedirection(APIView):
    def get(self, request, short_url_id):
        """
        GET method to handle redirection.
        """
        try:
            # Database Lookup
            url_mapping = UrlMapping.objects.get(short_url_id=short_url_id)

            # Check Expiration
            if url_mapping.expiration_date and url_mapping.expiration_date < now():
                return Response(
                    {"error": "The short URL has expired."},
                    status=status.HTTP_410_GONE  
                )
            return Response(
                {"long_url": url_mapping.long_url},
                status=status.HTTP_302_FOUND  
            )
        except UrlMapping.DoesNotExist:
            return Response(
                {"error": "The short URL does not exist."},
                status=status.HTTP_404_NOT_FOUND
            )