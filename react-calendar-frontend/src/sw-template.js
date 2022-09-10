/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

importScripts( 'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js' );
    
workbox.loadModule('workbox-background-sync');

workbox.precaching.precacheAndRoute( self.__WB_MANIFEST );
  
const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;    // Estrategias de cache
const { BackgroundSyncPlugin } = workbox.backgroundSync;    // Plugin para posteos offline

const cacheNetworkFirst = [
    '/api/auth/renew',
    '/api/events',
]

// NetworkFirst
// De forma predeterminada, intentará obtener la última respuesta de la red. Si la solicitud es exitosa, colocará la respuesta en el caché.
// Si la red no puede devolver una respuesta, se utilizará la respuesta almacenada en caché.

registerRoute(                                                                  // Workbox registrará un grupo de rutas para aplicar una estrategia
    ({ request, url }) => {                                                     // Aplicamos un callback, donde su resultado implica el uso o no del networkfirst
        // console.log({request, url})                                          // RegisterRoute recibe información sobre la petición (get, post, put, delete) 
        if ( cacheNetworkFirst.includes( url.pathname ) ) return true           // y sobre la url de destino en el backend. Si esta dirección esta entre 
                                                                                // las rutas de nuestra aplicación retornamos un true -> resp almacenada en cache.
        return false;                                                           // Si la dirección no esta entre las rutas de la app  retornamos false.
    },
    new NetworkFirst()
)

// registerRoute(
//     new RegExp('http://localhost:4000/api/auth/renew'),
//     new NetworkFirst()
// )

// registerRoute(
//     new RegExp('http://localhost:4000/api/events'),
//     new NetworkFirst()
// )

// CacheFirst
// Si hay una Respuesta en la memoria caché, la Solicitud se cumplirá con la respuesta almacenada en la memoria caché 
// y la red no se utilizará en absoluto. Si no hay una respuesta en caché, la solicitud se cumplirá mediante una solicitud de red 
// y la respuesta se almacenará en caché para que la siguiente solicitud se atienda directamente desde la memoria caché.

const cacheFirstNetwork = [
    'https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css'
];

registerRoute(
    ({ request, url }) => {
        console.log({url})

        if ( cacheFirstNetwork.includes( url.href ) ) return true        

        return false;
    },
    new CacheFirst()
)

// registerRoute( 
//     new RegExp('https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'),
//     new CacheFirst()
// )

// registerRoute( 
//     new RegExp('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css'),
//     new CacheFirst()
// )

// Posteos Offline 
const bgSyncPlugin = new BackgroundSyncPlugin('posteos-offline', {                        // Permite el crear un evento sin conexión y cuando esta vuelva
    maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)         // postearlo a la bd
});

//NetworkOnly
// Si requiere que se cumplan solicitudes específicas de la red, la NetworkOnly es la estrategia a utilizar.

registerRoute(
    new RegExp('http://localhost:4000/api/events'),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ]
    }),
    'POST'
)

registerRoute(
    new RegExp('http://localhost:4000/api/events/'),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ]
    }),
    'DELETE'
)

registerRoute(
    new RegExp('http://localhost:4000/api/events/'),
    new NetworkOnly({
        plugins: [ bgSyncPlugin ]
    }),
    'PUT'
)





