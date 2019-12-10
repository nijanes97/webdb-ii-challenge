
exports.up = function(knex) {
    return knex.schema.createTable("sales", tbl => {
        tbl.increments();

        tbl.string("seller", 128)
            .notNullable()
            .index();

        tbl.string("buyer", 128)
            .notNullable()
            .index();

        tbl.string("car", 128)
            .notNullable();

        tbl.float("price")
            .notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("sales")
};
