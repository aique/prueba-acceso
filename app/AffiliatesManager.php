<?php

/**
 * Gestor de afiliados, obtiene los datos de afiliado del sistema de persistencia a
 * partir de la URL introducida por el usuario.
 *
 * Para este caso el sistema de persistencia será simplemente un fichero JSON con
 * los datos de cada afiliado que se encuentra en /data/affiliates.json
 */
class AffiliatesManager
{
    private $dataPath = '../../../data/affiliates.json';

    public function getAffiliate($url)
    {
        $affiliate = null;

        $affiliates = json_decode(file_get_contents(__FILE__ . $this->dataPath));

        $numAffiliates = count($affiliates->affiliates);

        for($i = 0 ; $i < $numAffiliates && $affiliate == null ; $i++)
        {
            $currentAffiliate = $affiliates->affiliates[$i];

            if(strpos($url, $currentAffiliate->web))
            {
                $affiliate = $currentAffiliate;

                $affiliate;
            }
        }

        return json_encode($affiliate);
    }
}