function AffiliateManager()
{
    this.serviceUrl = '/services/getAffiliate.php'

    /**
     * Obtiene la información del afiliado a partir de la URL.
     *
     * @param url
     * @returns {*}
     */
    this.getAffiliateInfo = function(url)
    {
        var affiliate = this.getAffiliateInfoFromCookie(url);

        if(affiliate == null)
        {
            affiliate = this.getAffiliateInfoFromServer(url);

            this.saveAffiliateInfoCookie(affiliate);
        }

        return affiliate;
    }

    /**
     * Almacena la información del afiliado una vez se ha obtenido
     * en una cookie para un acceso más rápido en futuras búsquedas.
     *
     * @param affiliate
     */
    this.saveAffiliateInfoCookie = function(affiliate)
    {
        $.cookie('MB_AFFILIATE_NAME', affiliate.name);
        $.cookie('MB_AFFILIATE_WEB', affiliate.web);
        $.cookie('MB_AFFILIATE_NATS_WEBCAMS', affiliate.nats_webcams);
        $.cookie('MB_AFFILIATE_NATS_CUMLOUDER', affiliate.nats_cumlouder);
        $.cookie('MB_AFFILIATE_CSS_ROUTE', affiliate.css_route);
        $.cookie('MB_AFFILIATE_GOOGLE_ANALYTICS', affiliate.google_analytics);
    }

    /**
     * Obtiene la información del afiliado en las cookies. En caso de
     * no encontrarla devolverá null.
     *
     * @param url
     * @returns {*}
     */
    this.getAffiliateInfoFromCookie = function(url)
    {
        var affiliate = null;

        var affiliateWeb = $.cookie('MB_AFFILIATE_WEB');

        if(url.indexOf(affiliateWeb) != -1)
        {
            affiliate = new Affiliate(
            {
                name: $.cookie('MB_AFFILIATE_NAME'),
                web: $.cookie('MB_AFFILIATE_WEB'),
                nats_webcams: $.cookie('MB_AFFILIATE_NATS_WEBCAMS'),
                nats_cumlouder: $.cookie('MB_AFFILIATE_NATS_CUMLOUDER'),
                css_route: $.cookie('MB_AFFILIATE_CSS_ROUTE'),
                google_analytics: $.cookie('MB_AFFILIATE_GOOGLE_ANALYTICS')
            });
        }

        return affiliate;
    }

    /**
     * Obtiene la información del afiliado del servidor.
     *
     * @param url
     * @returns {*}
     */
    this.getAffiliateInfoFromServer = function(url)
    {
        var affiliate = null;

        $.ajax(
        {
            url: this.serviceUrl,
            method: 'GET',
            async: false,
            data: {'url': url}
        }).done(function(resp)
        {
            affiliate = new Affiliate($.parseJSON(resp));
        });

        return affiliate;
    }
}
