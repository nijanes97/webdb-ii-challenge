
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sales')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('sales').insert([
        { seller: 'John Doe', buyer: 'J Kerr', car: '2014 Ice cream truck', price: 64000 },
        { seller: 'Roger Hicks', buyer: 'Dexter Morgan', car: '2007 Minivan', price: 28000 },
        { seller: 'John Doe', buyer: 'Harold SquarePants', car: '2001 Boat', price: 5000 }
      ]);
    });
};
