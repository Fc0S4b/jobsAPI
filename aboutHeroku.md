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
