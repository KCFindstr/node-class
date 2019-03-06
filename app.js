let express = require('express');
let knex = require('knex');

let app = express();

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

app.listen(process.env.PORT || 8000);