# vanilla-cookieconsent 3.0.1 (autohospedado)

Copiado del tarball del registro npm, no del tag de GitHub que servía jsdelivr:
un tag de git se puede mover y el tarball de npm es inmutable.

    https://registry.npmjs.org/vanilla-cookieconsent/-/vanilla-cookieconsent-3.0.1.tgz
    integrity  sha512-gqc4x7O9t1I4xWr7x6/jtQWPr4PZK26SmeA0iyTv1WyoECfAGnu5JEOExmMEP+5Fz66AT9OiCBO3GII4wDQHLw==

Verificado idéntico byte a byte a lo que jsdelivr entregaba en producción:

    sha256  1267fd33fcf3ab4043a7cc62cc9259a2c66f839f695216f7737ed37b7b3e62e6  cookieconsent-3.0.1.umd.js
    sha256  ca046b8b1b1094107205988e7096a687b241c8ef5f3fefe5e543ed28d26646c1  cookieconsent-3.0.1.css

La versión va en el nombre del fichero a propósito: `versionAssets` de `build.js`
no baja a subdirectorios, así que el nombre es su propio cache busting y el
`.htaccess` puede darle el año de caché que da a cualquier `.js`/`.css`.

Al actualizar: cambiar los dos ficheros, el número en `CookieConsentService.js`
y estos hashes. La guarda `checkVendoredConsent` del SSG corta el deploy si las
URLs vuelven a apuntar a un CDN.

Licencia MIT, incluida en `LICENSE`.
