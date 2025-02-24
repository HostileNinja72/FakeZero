from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Produit, Cart, CartItem
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from django.views import View
from rest_framework.decorators import api_view
from rest_framework import status
# from django.contrib.auth.tokens import RefreshToken







# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]






class ListeProduitsView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, *args, **kwargs):
        produits = Produit.objects.all()
        produits_data = [
            {
                "id": produit.id,
                "name": produit.name,
                "image": request.build_absolute_uri(produit.image.url),
                "description": produit.description,
                "price": produit.price,
                "stock": produit.stock,
                "categorie": produit.categorie,
            }
            for produit in produits
        ]
        return Response(produits_data)


class ProduitDetailView(View):
    def get(self, request, id, *args, **kwargs):
        try:
            produit = Produit.objects.get(id=id)
            produit_data = {
                "id": produit.id,
                "name": produit.name,
                "image": request.build_absolute_uri(produit.image.url),
                "description": produit.description,
                "price": produit.price,
                "stock": produit.stock,
                "categorie": produit.categorie,
                "date_add": produit.date_add,
            }
            return JsonResponse(produit_data)
        except Produit.DoesNotExist:
            return JsonResponse({"error": "Produit non trouvé"}, status=404)


class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]  # Activez cette permission si nécessaire

    def post(self, request):
        user = request.user
        product_id = request.data.get("product_id")
        quantity = request.data.get("quantity", 1)

        try:
            product = Produit.objects.get(id=product_id)  # Remplacement de Product par Produit
        except Produit.DoesNotExist:  # Gestion des erreurs avec le bon modèle
            return Response({"error": "Produit introuvable."}, status=status.HTTP_404_NOT_FOUND)

        cart, _ = Cart.objects.get_or_create(user=user)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            cart_item.quantity += int(quantity)
        cart_item.save()

        return Response({"message": "Produit ajouté au panier avec succès !"}, status=status.HTTP_200_OK)



class ViewCartAPIView(APIView):
    permission_classes = [IsAuthenticated] 
    

    def get(self, request):
        user = request.user

        try:
            # Récupérer le panier associé à l'utilisateur
            cart = Cart.objects.get(user=user)
        except Cart.DoesNotExist:
            return Response({"error": "Le panier est vide ou n'existe pas."}, status=status.HTTP_404_NOT_FOUND)

        # Récupérer les articles dans le panier
        items = cart.items.select_related('product').all()  

        # Construire les données du panier
        cart_data = [
            {
                "product_id": item.product.id, 
                "name": item.product.name, 
                "price": item.product.price, 
                "quantity": item.quantity,
                "total": item.product.price * item.quantity,
                "image": request.build_absolute_uri(item.product.image.url),  
            }
            for item in items
        ]

        return Response(cart_data, status=status.HTTP_200_OK)



class RemoveFromCartView(APIView):
    permission_classes = [IsAuthenticated]   # Enable authentication if necessary

    def delete(self, request, cart_item_id):
        try:
            # Get the cart item to delete
            cart_item = CartItem.objects.get(product_id=cart_item_id, cart__user=request.user)
        except CartItem.DoesNotExist:
            return Response({"error": "L'élément du panier est introuvable."}, status=status.HTTP_404_NOT_FOUND)

        # Delete the item from the cart
        cart_item.delete()

        return Response({"message": "Produit supprimé du panier avec succès."}, status=status.HTTP_204_NO_CONTENT)


class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.data.get('refresh_token')

        if refresh_token:
            try:
                # Désactiver le refresh token
                token = RefreshToken(refresh_token)
                token.blacklist()  # Invalider le refresh token
                return Response({"message": "Logged out successfully."}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "No refresh token provided."}, status=status.HTTP_400_BAD_REQUEST)