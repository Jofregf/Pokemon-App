const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    hp: {
      type: DataTypes.INTEGER,
    },
    attack: {
      type: DataTypes.INTEGER,
    },
    defense: {
      type: DataTypes.INTEGER,
    },
    speed: {
      type: DataTypes.INTEGER,
    },
    height: { //! altura
      type: DataTypes.INTEGER,
    },
    weight: { //! peso
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
    },
    createdInDb: { //! me es mas fácil acceder al pj creado en base de datos por esta propiedad
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }, 
  },
  { timestamps: false}
  );
};
