from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Product
from .serializers import ProductSerializer

# Product List & Search View
class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        search_query = self.request.query_params.get('q', '')
        sort_by = self.request.query_params.get('sort', 'id')
        return Product.objects.filter(name__icontains=search_query).order_by(sort_by)

# Select Product View
class SelectProductView(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        product = self.get_object()
        product.selected = True
        product.save()
        return Response(status=status.HTTP_200_OK)
