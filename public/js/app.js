$(function()
{
    var url = window.location.href;
    var affiliateManager = new AffiliateManager();
    var galleryManager = new GalleryManager();

    var affiliate = affiliateManager.getAffiliateInfo(url); // se obtienen los datos de afiliado del servidor

    // StylesManager.applyStyles(affiliate, url); // antigua versión del método

    StylesManager.applyStyles(affiliate); // se aplican los estilos del afiliado

    galleryManager.loadGalleries(affiliate); // se cargan las galerías

    setInterval(function() {galleryManager.loadGalleries(affiliate);}, Config.galleryRefreshPeriod); // sistema de refresco cada 15 minutos
});
