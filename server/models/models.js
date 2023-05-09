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
  isEmailConfirmed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  pronounces: { type: DataTypes.STRING, allowNull: false }
});

const Roles = sequelize.define('roles', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false }
});

const Shelves = sequelize.define('shelves', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false }
});

const Outfits = sequelize.define('outfits', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

const Stuffs = sequelize.define('stuffs', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  isAvailable: { type: DataTypes.BOOLEAN, allowNull: false }
});

const ReservedOutfits = sequelize.define('reservedOutfits', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false }
});

const UsersStuffs = sequelize.define('usersStuffs', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false }
});

const Labels = sequelize.define('labels', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  description: { type: DataTypes.STRING, allowNull: false },
  texture: { type: DataTypes.STRING, allowNull: false },
  color: { type: DataTypes.STRING, allowNull: false },
  size: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  brand: { type: DataTypes.STRING, allowNull: false }
});

const ReservedStuffs = sequelize.define('reservedStuffs', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false }
});

const UsersOutfits = sequelize.define('usersOutfits', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false }
});

// ReservedStuffs and Stuffs
ReservedStuffs.hasMany(Stuffs);
Stuffs.belongsTo(ReservedStuffs);

// Stuffs and Labels
Labels.belongsTo(Stuffs);
Stuffs.hasOne(Labels);

// Stuffs and Users
Stuffs.belongsTo(Users);
Users.hasMany(Stuffs);

// Stuffs and Shelves
Stuffs.belongsTo(Shelves);
Shelves.hasMany(Stuffs);

// Users and Roles
Users.belongsTo(Roles);
Roles.hasMany(Users);

// Shelves and Users
Shelves.belongsTo(Users);
Users.hasMany(Shelves);

// Shelves and Categories
Shelves.belongsTo(Categories);
Categories.hasMany(Shelves);

// Outfits and Stuffs
Outfits.belongsTo(Stuffs);
Stuffs.hasOne(Outfits);

// ReservedOutfits and Outfits
ReservedOutfits.belongsTo(Outfits);
Outfits.hasOne(ReservedOutfits);

// UsersStuff and Stuffs
UsersStuffs.belongsTo(Stuffs);
Stuffs.hasOne(UsersStuffs);

// UsersOutfits and Outfits
UsersOutfits.belongsTo(Outfits);
Outfits.hasOne(UsersOutfits);

module.exports = {
            Categories, 
            Users, 
            Roles, 
            Shelves, 
            Outfits, 
            Stuffs, 
            Labels, 
            UsersStuffs, 
            UsersOutfits, 
            ReservedOutfits, 
            ReservedStuffs};
