from django.urls import path
from .views import ProductListView, SelectProductView

urlpatterns = [
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/select/', SelectProductView.as_view(), name='select-product'),
]
