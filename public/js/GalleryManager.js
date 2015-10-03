function GalleryManager()
{
    this.url = '/services/getGallery.php';
    this.thumbsUrl = 'http://w0.imgcm.com/modelos/';
    this.camsUrl = 'http://webcams.cumlouder.com/joinmb/cumlouder/';

    this.smallThumbsRowNumImg = 5; // número de imágenes en una fila sin imágenes de tamaño grande
    this.bigTumbRowNumImg = 7; // número de imágenes en una fila con una imagen grande

    /**
     * Carga las galerías
     */
    this.loadGalleries = function(affiliate)
    {
        var lastGalleryRefresh = $.cookie('MB_LAST_GALLERY_REFRESH');

        if(lastGalleryRefresh == undefined)
        {
            // Si todavía no tiene fecha de acceso se obtiene nueva información para evitar que se cargue un fichero demasiado obsoleto

            this.loadGalleriesFromServer(affiliate, true);
        }
        else
        {
            lastGalleryRefresh = new Date(lastGalleryRefresh);

            var dateDiff = new Date() - lastGalleryRefresh;

            // Si han pasado los 15 minutos y se debe actualizar el fichero que contiene la galería con la llamada al servicio

            if(dateDiff > Config.galleryRefreshPeriod)
            {
                this.loadGalleriesFromServer(affiliate, true);
            }
            else
            {
                this.loadGalleriesFromServer(affiliate, false);
            }
        }
    }

    /**
     * Obtiene la información que ha de aparecer en la galería llamando al servicio
     * correspondiente.
     *
     * Mediante un parámetro se indicará si han pasado los minutos indicados en el
     * fichero de configuración para realizar una nueva llamada al servicio y obtener
     * la nueva información.
     *
     * De lo contrario simplemente devolverá el contenido del fichero en el que se guarda
     * la última galería recibida.
     *
     * @param affiliate
     * @param refresh
     */
    this.loadGalleriesFromServer = function(affiliate, refresh)
    {
        var galleryManager = this;

        if(refresh)
        {
            $.cookie('MB_LAST_GALLERY_REFRESH', new Date().toString()); // actualiza la fecha de último refresco
        }

        $.ajax(
        {
            url: this.url,
            type: "GET",
            data: {refresh: refresh}
        }).done(function(response)
        {
            galleryManager.loadGallery($.parseJSON(response), affiliate);
        });
    }

    /**
     * Carga la galería de imágenes
     *
     * @param webcams
     */
    this.loadGallery = function(webcams, affiliate)
    {
        $('.chica').remove(); // se eliminan las imágenes actuales

        var numWebcams = webcams.length;

        var gallery = $('.listado-chicas');

        var printingSmallThumbsRow = true; // indica si se está imprimiendo una fila con imágenes grandes o no
        var thumbCounter = 0; // contador de las imágenes impresas en la actual fila
        var oddBigThumb = true; // indica si la imagen grande debe colocarse a un lado o a otro de la fila
        var firstBigThumb = true; // indica si ya se ha imprimido la imagen grande, la que no debe aparecer en pequeño

        for(var i = 0 ; i < numWebcams ; i++)
        {
            if(printingSmallThumbsRow)
            {
                gallery.append(this.createThumb(webcams[i], affiliate, null, null));

                thumbCounter++;

                if(thumbCounter == this.smallThumbsRowNumImg)
                {
                    thumbCounter = 0;
                    printingSmallThumbsRow = false;
                }
            }
            else
            {

                if(thumbCounter == 0)
                {
                    if(oddBigThumb)
                    {
                        gallery.append(this.createThumb(webcams[i], affiliate, 'big', null));

                        if(firstBigThumb)
                        {
                            firstBigThumb = false;
                        }
                        else
                        {
                            // si no es la primera imagen grande se imprime también en el listado de pequeñas como dice el enunciado

                            gallery.append(this.createThumb(webcams[i], affiliate, null, null));

                            thumbCounter++;
                        }

                        oddBigThumb = false;
                    }
                    else
                    {
                        gallery.append(this.createThumb(webcams[i], affiliate, 'big', 'grande-derecha'));

                        // si no es la primera imagen grande (para este caso nunca lo es) se imprime también en el listado de pequeñas como dice el enunciado

                        gallery.append(this.createThumb(webcams[i], affiliate, null, null));

                        thumbCounter++;

                        oddBigThumb = true;
                    }
                }
                else
                {
                    gallery.append(this.createThumb(webcams[i], affiliate, null, null));
                }

                thumbCounter++;

                if(thumbCounter == this.bigTumbRowNumImg)
                {
                    thumbCounter = 0;
                    printingSmallThumbsRow = true;
                }
            }
        }
    }

    /**
     * Método que crea un thumb normal o de gran tamaño, en función
     * de lo especificado en el parámetro.
     *
     * @param webcam
     * @param affiliate
     * @param type
     * @param additionalClass
     * @returns {*}
     */
    this.createThumb = function(webcam, affiliate, type, additionalClass)
    {
        var thumb = null;

        if(type == 'big')
        {
            thumb = this.createBigThumb(webcam, affiliate, additionalClass);
        }
        else
        {
            thumb = this.createCommonThumb(webcam, affiliate);
        }

        // evento click sobre el thumb

        $(thumb.find('a')).click(function (e)
        {
            e.preventDefault();

            var href = $(this).attr('href');

            console.log(href);

            $.modal('<iframe src="' + href + '" height="675" width="1050" style="border:0">',
            {
                closeHTML:"",
                overlayClose: true
            });
        });

        return thumb;
    }

    this.createBigThumb = function(webcam, affiliate, additionalClass)
    {
        var imgSrc = this.thumbsUrl + webcam.wbmerThumb1;
        var href = this.camsUrl + webcam.wbmerPermalink + '/?nats=' + affiliate.nats_webcams;

        if(additionalClass == null)
        {
            var thumbContainer = $('<div></div>').addClass('chica chica-grande');
        }
        else
        {
            var thumbContainer = $('<div></div>').addClass('chica chica-grande ' + additionalClass);
        }

        var link = $('<a></a>').addClass('link').attr('href', href).attr('title', '');
        var thumb = $('<span></span>').addClass('thumb');
        var thumbImg = $('<img />').attr('src', imgSrc).attr('width', '357').attr('height', '307').attr('alt', '').attr('title', '');
        var name = $('<span></span>').addClass('nombre-chica').text(webcam.wbmerNick);
        var ico = $('<span></span>').addClass('ico-online');
        var fav = $('<span></span>').addClass('ico-favorito').attr('id', 'favorito');

        link.append(thumb.append(thumbImg))
            .append(name.append(ico))
            .append(fav);

        thumbContainer.append(link);

        return thumbContainer;
    }

    this.createCommonThumb = function(webcam, affiliate)
    {
        var imgSrc = this.thumbsUrl + webcam.wbmerThumb1;
        var href = this.camsUrl + webcam.wbmerPermalink + '/?nats=' + affiliate.nats_webcams;;

        var thumbContainer = $('<div></div>').addClass('chica');
        var link = $('<a></a>').addClass('link').attr('href', href).attr('title', '');
        var thumb = $('<span></span>').addClass('thumb');
        var thumbImg = $('<img />').attr('src', imgSrc).attr('width', '175').attr('height', '150').attr('alt', '').attr('title', '');
        var name = $('<span></span>').addClass('nombre-chica').text(webcam.wbmerNick);
        var ico = $('<span></span>').addClass('ico-online');
        var fav = $('<span></span>').addClass('ico-favorito').attr('id', 'favorito');

        link.append(thumb.append(thumbImg))
            .append(name.append(ico))
            .append(fav);

        thumbContainer.append(link);

        return thumbContainer;
    }
}