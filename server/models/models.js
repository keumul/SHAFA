const sequelize = require('../models/database')
const {DataTypes} = require('sequelize');

const Categories = sequelize.define('categories', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false }
});

const Users = sequelize.define('users', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  passwordHash: { type: DataTypes.STRING, allowNull: false }
});

const Roles = sequelize.define('roles', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,  },
  name: { type: DataTypes.STRING, allowNull: false }
});

const Shelves = sequelize.define('shelves', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false }
});

const Outfits = sequelize.define('outfits', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false }
});

const Stuffs = sequelize.define('stuffs', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  img: {type: DataTypes.STRING, allowNull: false}
});

const Labels = sequelize.define('labels', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  description: { type: DataTypes.STRING, allowNull: false },
  texture: { type: DataTypes.STRING, allowNull: false },
  color: { type: DataTypes.STRING, allowNull: false },
  size: { type: DataTypes.STRING, allowNull: false },
  brand: { type: DataTypes.STRING, allowNull: false }
});


const OutfitStuff = sequelize.define('outfitStuff', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

const SharedAccess = sequelize.define('sharedAccess', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

Labels.hasOne(Stuffs);
Stuffs.belongsTo(Labels);

Stuffs.belongsTo(Users);
Users.hasMany(Stuffs);

Outfits.belongsTo(Users);
Users.hasMany(Outfits);

Stuffs.belongsTo(Shelves);
Shelves.hasMany(Stuffs);

Users.belongsTo(Roles);
Roles.hasMany(Users);

Shelves.belongsTo(Users);
Users.hasMany(Shelves);

Shelves.belongsTo(Categories);
Categories.hasMany(Shelves);

Outfits.belongsToMany(Stuffs, { through: OutfitStuff, foreignKey: 'outfitId' });
Stuffs.belongsToMany(Outfits, { through: OutfitStuff, foreignKey: 'stuffId' });

OutfitStuff.belongsTo(Stuffs, { foreignKey: 'stuffId' });
OutfitStuff.belongsTo(Outfits, { foreignKey: 'outfitId' });

Shelves.belongsToMany(Users, {
  through: SharedAccess,
  foreignKey: 'shelfId',
  otherKey: 'userId',
  as: 'Users',
});

Users.belongsToMany(Shelves, {
  through: SharedAccess,
  foreignKey: 'userId',
  otherKey: 'shelfId',
  as: 'Shelves',
});
Shelves.hasMany(SharedAccess, { foreignKey: 'shelfId' });
SharedAccess.belongsTo(Shelves, { foreignKey: 'shelfId' });
SharedAccess.belongsTo(Users, { foreignKey: 'userId' });

module.exports = {
            Categories, 
            Users, 
            Roles, 
            Shelves, 
            Outfits, 
            Stuffs, 
            Labels,
            OutfitStuff,
            SharedAccess
          };
