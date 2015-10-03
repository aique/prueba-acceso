<?php

    // fichero que simula una llamada a un servicio del servidor con el fin de obtener los datos de afiliado

    include(__DIR__ . "../../../app/AffiliatesManager.php");

    $url = $_GET['url'];

    $affiliateManager = new AffiliatesManager();

    print_r($affiliateManager->getAffiliate($url));