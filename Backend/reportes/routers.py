from rest_framework.routers import DefaultRouter
from .views import CommercialOperationView

router = DefaultRouter()
router.register(r'CommercialOperations',CommercialOperationView)
urlpatterns = router.urls
    
