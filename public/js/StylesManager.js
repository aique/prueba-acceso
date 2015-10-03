function StylesManager()
{

}

// Se utilizará un array para definir qué hojas de estilos se aplican en casa caso, por si una web concreta necesitara estilos adicionales

/*

StylesManager.urlToStylesMapping =
    [
        {
            key: 'babosas',
            styles: ['/reset.css', '/estilos.css']
        },
        {
            key: 'cerdas',
            styles: ['/reset.css', '/estilos.css']
        },
        {
            key: 'conejox',
            styles: ['/reset.css', '/estilos.css']
        },
    ];

StylesManager.applyStyles = function(affiliate, url)
{
    var numAffiliates = StylesManager.urlToStylesMapping.length;

    var styleFounded = false;

    for(var i = 0 ; i < numAffiliates && !styleFounded ; i++)
    {
        var currentAffiliateData = StylesManager.urlToStylesMapping[i];

        if(url.indexOf(currentAffiliateData.key) >= 0)
        {
            var numStyles = currentAffiliateData.styles.length;

            var head = $('head');

            for(var j = 0 ; j < numStyles ; j++)
            {
                head.append('<link rel="stylesheet" type="text/css" href="/styles/' + affiliate.css_route + currentAffiliateData.styles[j] + '">');
            }

            styleFounded = true;
        }
    }
}

*/

// Al ver que la ruta css está en base de datos y que la estructura teóricamente es la misma, dejo ésta solución como la más adecuada

StylesManager.applyStyles = function(affiliate)
{
    var head = $('head');

    head.append('<link rel="stylesheet" type="text/css" href="/styles/' + affiliate.css_route + '/reset.css' + '">');
    head.append('<link rel="stylesheet" type="text/css" href="/styles/' + affiliate.css_route + '/estilos.css' + '">');

    var logo = $('.logo-sitio');

    logo.attr('title', affiliate.name);
    logo.find('a').text(affiliate.name);
}