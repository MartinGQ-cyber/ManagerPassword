# ManagerPassword
Gestor de Contraseñas || Es mi Proyecto de Fin de Ciclo

ES UN **GESTOR DE CONTRASEÑAS CONECTADO A UNA BDD.**

SE TRATA DE UNA **APPWEB QUE SE CONECTA A UNA BDD DE AMAZON-AWS** CON EL FIN DE QUE TU PUEDAS **TENER TUS CONTRASEÑAS EN CUALQUIER PARTE.**

ES UNA **APP COMPLETAMENTE DESARROLLADA CON NODEJS.**
-------------------------------------------------------------------------------------------------------------------------------------------------------------  ------------------------
TODO DATO PRIVADO COMO LA CONTRASEÑA DEL **USUARIO MASTER** Y **LAS CUENTAS QUE VAYAS AÑADIENDO** ESTÁN **ENCRIPTADAS** PARA ELLO, HE UTILIZADO **DOS METODOS DISTINTOS DE ENCRIPTACIÓN UNA ES BYCRIPTJS PARA LA CONTRASEÑA DEL USUARIO MASTER Y OTRO ES CRYTPOJS PARA LAS CUENTAS QUE VAYAS A GUARDADAR, LO INTERESANTE DE LA SEGUNDA ES QUE NECESITAS CREAR UNA PALABRA CLAVE PARA ENCRYPTAR/DESENCRYPTAR LA CONTRASEÑA.**

ESTO SOLO EL CÓDIGO DE LA APPWEB LUEGO,**EL SERVIDOR QUE HE USADO ES APCAHE**  Y HE REALIZADO MODIFICACIONES PARA QUE EL SERVIDOR **NO SEA VULNERABLE A ATAQUES DE INJECTION-SQL, XSS(CROSS-SITE-SCRIPTING), TROYANOS, ATAQUES DDOS ETC..** 

TODO ESTO ES CONTROLADO POR **DOS WAF** **mod-security y mod-security-evasive**. Y en un **repositorio de git hub encontraras reglas actualizadas para combatir/prevenir estos tipos de ataques a tu web.**
Además, hay que cambiar la configuración por defecto con la que viene **Apache** porque hay que desactivar cosas como: **Tokens, la firma, el banner, el etag etc** y configurar cosas como: **la reedireccionar el trafico de http a https, crear un certificado en Let´s Encripts para que vaya cifrado los datos, el balanceo de carga entre el los dos servidores(Apache y Nodejs) etc..**
