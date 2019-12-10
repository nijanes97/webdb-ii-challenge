
exports.up = function(knex) {
    return knex.schema.createTable("cars", tbl => {
        tbl.increments();

        tbl.string("VIN", 128)
            .notNullable()
            .unique()
            .index();

        tbl.string("make", 128)
            .notNullable();
        
        tbl.string("model", 128)
            .notNullable();
        tbl.float("mileage")
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("cars")
};
