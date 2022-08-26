### Deploying en heroku

### heroku dejará de ser gratis en noviembre 2022

### notas sobre deploy jobs-api to heroku

1. Aislar la carpeta en donde tienes tu proyecto
2. busca en docs de heroku deploy node app
3. elimina el git repo existente rm -rf .git
4. no olvides el port variable para heroku
5. app.get('/', (req, res)=> {
   res.send('jobs api')
   }) para testear
6. checkear node version, en package.json agregar "engines": {
   "node": "14.x", en "scripts" "start" cambiar nodemon por node
   }
7. Crear nuevo archivo en root sin extensión de nombre Procfile con web: node app.js
8. inicializa git init, git add ., git commit -m "initial commit", heroku login (con el CLI de heroku instalado), presiona cualquier tecla para continuar, haz login, heroku create jobs-api-06 y enter (si no colocas un nombre, se agregará uno por default), git remote -v (verás enlaces para fetch y push), heroku config:set JWT_LIFETIME=10d (para las .env variables), git push heroku master (main en vez de master arroja error), deberías ver la app en el dashboard pero aún no está en funcionamiento por las variables .env.
9. Ve a los settings de la app (en el navegador), en config vars, reveal config vars, agrega el resto de las .env variables.
10. en la misma página, sube donde dice more y luego restart all dynos, la app ya debería funcionar
11. testea en postman, configura en globals la url, nombra la nueva variable global PROD_URL y copia y pega el enlace generado por heroku para guardar tu app + api/v1
12. crea nuevas route para no alterar las anteriores, usa un post req con la nueva url para login, pega en el body el email y password, pega el código para conseguir el token de forma dinámica en test
13. crea una nueva route con get req, para jobs y configura el authorization para bearer token para obtener todos los jobs y listo, la app debería funcionar bien

### clone existing heroku project

1. ve a la terminal cd desktop
2. git:clone -a jobs-api-06 (deberías ver el repo en tu escritorio, este está enlazado a heroku, cualquier cambio se sube a heroku)
3. faltan los node modules y .env, crea un nuevo archivo
   .env para mongo_uri con los env que están en las configuraciones de la app en heroku luego npm install && npm start
4. si haces mas cambios al proyecto, cambia el script a nodemon para mas comodidad
5. tu proyecto está en el puerto que configuraste

### exportando docs en postman

1. asegúrate de tener la nueva url de heroku configurada para todos los req
2. postman publica por separado los docs en otra url, en este proyecto se usa el package swagger para hacer los docs de la api y la idea es que esté todo en la misma url
3. ve a los 3 puntos de la colleción de 06-Jobs-API y luego export, si no lo ves inicia sesión en postman (se supone que es gratis)
4. marca la opción recomendada para exportar
5. escribe un nombre para la ubicación y tendrás guardado un archivo json

### APIMATIC info

1. no se puede pasar los docs de postman directamente a swagger, se debe formatear
2. para formatear usa apimatic que es free por 14 días
3. importa el json doc, omite las advertencias y no los errores
4. edit api en la card, verás basic settings, cambia el name y save basic settings. Busca server configuration, enviroment production, server queda igual, busca la url tiene que ser la de heroku agrega /api/v1, guarda cambios
5. busca la opción de authentications que sea del tipo bearer token (queda igual por defecto)
6. ve a los endpoints, debes ordenar y clasificar las req para auth y jobs. Ve a register y cambia de grupo a auth y skip authentication (las demás no se saltarán esto), guarda cambios, hace lo mismo para login con auth y skip authentication, el resto cambiales solo el grupo para jobs
7. ve de nuevo al dashboard, busca las opciones de export api, escoge el formato de openapi v3 yaml, veras los datos en el navegador

### swagger ui editor

1. ve a la página de swagger, copia y pega los datos que exportaste anteriormente
2. ve a tags, y elimina la primera de misc
3. ve a swagger ui parameters, busca common parameters for all methods of a path, toma y copia todo desde user hasta el primer get
4. regresa a swagger, busca y elimina los path con el id hardcoded para get single job, update job y delete job y pega el código anterior, cambia user por jobs y en type: string y description: job id
5. puedes probar la api ahí mismo con try it out, envía un body y luego execute
6. puedes ir a authorize (opción verde, parte superior) para pegar el token y poder ver los req para jobs (usa el id de un job para single req)

### add swagger ui

1. necesitaras dos paquetes, swagger-ui-express y yamljs
2. yamljs convierte el archivo yaml que exportaste con apimatic para que swagger lo entienda y el otro agrega swagger a la app
3. crea un archivo en root swagger.yaml y pega el código que exportaste antes
4. agrega el siguiente código:

app.js

<!-- Swagger -->

const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

sobre //routes
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

en el get de prueba:
res.send('<h1>jobs API</h1><a href="/api-docs">Documentation</a>');

5. si intentas probarlo en localmachine no funcionará, debe ser una vez subido a heroku
6. busca el puerto 5000 y verás tu app corriendo, verás un enlace hacia la documentación
7. git add ., git commit -m "swagger docs added" y git push heroku master
