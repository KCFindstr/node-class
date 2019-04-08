const frisby = require('frisby');
const { Joi } = frisby;

it('should return a 404 when modifying a track that does not exist', () => {
	return frisby
	.patch('http://localhost:8000/tracks/-1')
	.expect('status', 404);
});

it('should return a 200 when successfully modified a track', () => {
	return frisby
	.patch('http://localhost:8000/tracks/1', {
		name: 'ITP',
		unitPrice: 1.99,
		milliseconds: 2333
	})
	.expect('status', 200)
	.expect('json', {
		name: 'ITP',
		unitPrice: 1.99,
		milliseconds: 2333
	});
});

it('should return a 422 when validation fails', () => {
	return frisby
	.patch('http://localhost:8000/tracks/1', {
		"name": "",
		"milliseconds": "a",
		"unitPrice": "b"
	})
	.expect('status', 422)
	.expect('json', {
		errors: [{
			"attribute": "name",
			"message": "Name should not be empty."
		}, {
			"attribute": "milliseconds",
			"message": "Milliseconds must be numeric."
		}, {
			"attribute": "unitPrice",
			"message": "Unit price must be numeric."
		}]
	});
});
