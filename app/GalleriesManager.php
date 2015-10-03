<?php

class GalleriesManager
{
    private $url = 'http://webcams.cumlouder.com/feed/webcams/online/61/1';
    private $galleriesFilePath = '../../../data/gallery.json';

    /**
     * Obtiene la información que ha de aparecer en la galería.
     *
     * Mediante un parámetro se indicará si han pasado los minutos indicados en el
     * fichero de configuración para realizar una nueva llamada al servicio y obtener
     * la nueva información.
     *
     * De lo contrario simplemente devolverá el contenido del fichero en el que se guarda
     * la última galería recibida.
     *
     * @param $refresh
     * @return string
     */
    public function getGallery($refresh)
    {
        if($refresh == 'true')
        {
            $gallery = file_get_contents($this->url);

            file_put_contents(__FILE__ . $this->galleriesFilePath, $gallery);

            return $gallery;
        }
        else
        {
            $gallery = file_get_contents(__FILE__ . $this->galleriesFilePath);

            // Si existe el fichero de galerias se devuelve, si no se crea

            if($gallery)
            {
                return $gallery;
            }
            else
            {
                $gallery = file_get_contents($this->url);

                file_put_contents(__FILE__ . $this->galleriesFilePath, $gallery);

                return $gallery;
            }
        }
    }
}