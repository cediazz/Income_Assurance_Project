from rest_framework.routers import DefaultRouter
from .views import CommercialOfficeProvinceView

router = DefaultRouter()
router.register(r'CommercialOfficeProvinces',CommercialOfficeProvinceView)
urlpatterns = router.urls
    
