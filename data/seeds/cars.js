
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { VIN: '1HGCM82633A004352', make: 'Honda', model: 'Civic', mileage: 65000 },
        { VIN: '1HGCM82633A004353', make: 'Toyota', model: 'Prius', mileage: 212500 },
        { VIN: '1HGCM82633A004354', make: 'Toyota', model: 'Highlander', mileage: 145200 }
      ]);
    });
};
