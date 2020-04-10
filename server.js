const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const app = express();
const { redis, config, scraper } = require('./routes/instances');
const { keys } = config;

<<<<<<< HEAD
const execAll = () => {
    scraper.getWorldometers.getCountries(keys, redis);
    scraper.getWorldometers.getYesterday(keys, redis);
    scraper.getAll(keys, redis);
    scraper.getStates(keys, redis);
    scraper.jhuLocations.jhudataV2(keys, redis);
    scraper.historical.historicalV2(keys, redis);
=======
const execAll = async () => {
	await Promise.all([
		scraper.getWorldometerPage(keys, redis),
		scraper.getStates(keys, redis),
		scraper.jhuLocations.jhudataV2(keys, redis),
		scraper.historical.historicalV2(keys, redis),
		scraper.historical.getHistoricalUSADataV2(keys, redis)
	]);
	app.emit('scrapper_finished');
>>>>>>> a7a5b6926aaf313b2b3b8aee7c9073bbd0de4f4e
};

execAll();
setInterval(execAll, config.interval);

<<<<<<< HEAD
app.get('/', async(request, response) => {
    response.redirect('docs');
});

const listener = app.listen(process.env.PORT || config.port, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});

=======
app.use(cors());
app.get('/', async (request, response) => response.redirect('https://github.com/novelcovid/api'));

const listener = app.listen(config.port, () =>
	console.log(`Your app is listening on port ${listener.address().port}`)
);

app.get('/invite', async (req, res) =>
	res.redirect('https://discordapp.com/oauth2/authorize?client_id=685268214435020809&scope=bot&permissions=537250880')
);

app.get('/support', async (req, res) => res.redirect('https://discord.gg/EvbMshU'));
>>>>>>> a7a5b6926aaf313b2b3b8aee7c9073bbd0de4f4e

app.use('/public', express.static('assets'));
app.use('/docs',
    swaggerUi.serve,
    swaggerUi.setup(null, {
        explorer: true,
        customSiteTitle: 'NovelCOVID 19 API',
        customfavIcon: '/public/virus.png',
        customCssUrl: '/public/apidocs/custom.css',
        swaggerOptions: {
            urls: [{
                    name: 'version 2.0.0',
                    url: '/public/apidocs/swagger_v2.json'
                },
                {
                    name: 'version 1.0.0',
                    url: '/public/apidocs/swagger_v1.json'
                }
            ]
        }
    })
);

app.use(require('./routes/api_worldometers'));
app.use(require('./routes/api_historical'));
app.use(require('./routes/api_jhucsse'));
app.use(require('./routes/api_deprecated'));

module.exports = app;