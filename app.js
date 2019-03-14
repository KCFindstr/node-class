const express = require('express');
const knex = require('knex');

const app = express();
const Track = require('./models/track');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/api/genres', (request, response) => {
	let connection = knex({
		client: 'sqlite3',
		connection: {
			filename: 'database.sqlite'
		}
	});

	connection.select().from('genres').then((genres) => {
		response.json(genres);
	});
});

app.get('/api/genres/:id', (request, response) => {
	let id = request.params.id;
	let connection = knex({
		client: 'sqlite3',
		connection: {
			filename: 'database.sqlite'
		}
	});

	connection
		.select()
		.from('genres')
		.where('GenreId', id)
		.first()
		.then((genre) => {
			if (genre) {
				response.json(genre);
			} else {
				response.status(404).json({
					error: `Genre ${id} not found`
				});
			}
		});
});

app.get('/api/artists', (request, response) => {
	let connection = knex({
		client: 'sqlite3',
		connection: {
			filename: 'database.sqlite'
		}
	});

	let query = connection.select().from('artists');
	if (request.query.filter) {
		query = query.where('Name', 'like', `%${request.query.filter}%`)
	}

	query.then((artists) => {
		artists = artists.map(obj => {
			return {
				id: obj.ArtistId.toString(),
				name: obj.Name
			}
		});
		response.json(artists);
	});
});

app.patch('/tracks/:id', (request, response) => {
	let id = request.params.id;
	let {name, unitPrice, milliseconds} = request.body;
	console.log(request.body);
	Track.findByPk(id).then((track) => {
		if (!track) {
			return Promise.reject();
		} else {
			track.name = name;
			track.unitPrice = unitPrice;
			track.milliseconds = milliseconds;
			return track.save();
		}
	})
	.then((result) => {
		response.status(200).json(result);
	}, (result) => {
		if (!result) {
			response.status(404).send();
		} else {
			response.status(422).json({
				errors: result.errors.map((error) => {
					return {
						attribute: error.path,
						message: error.message
					};
				})
			});
		}
	});
});

app.listen(process.env.PORT || 8000);