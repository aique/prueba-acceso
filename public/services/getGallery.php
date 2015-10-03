<?php

    // fichero que simula una llamada a un servicio del servidor con el fin de obtener el contenido de la galería

    include(__DIR__ . "../../../app/GalleriesManager.php");

    $refresh = $_GET['refresh'];

    $galleriesManager = new GalleriesManager();

    echo $galleriesManager->getGallery($refresh);