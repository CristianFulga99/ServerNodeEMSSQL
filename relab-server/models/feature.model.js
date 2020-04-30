//Classe utile a rappresentare le feature degli oggetti geojson
module.exports = class Feature{
    constructor(id, geometry) {
        this.type = "Feature";
        this.properties = new Properties(id); //Per ora le proprietà contengono un solo valore (id)
        this.geometry = geometry; //Contiene la geometria del poligono.
    }
}

//Iniziamo a preparare la classe Properties che complicheremo in seguito
class Properties
{
    constructor(id)
    {
        this.id = id;
    }
}