import bcrypt from 'bcryptjs';
import genSalt from './salt';

const salt = bcrypt.genSaltSync(10);
let users;
// webpack doesn't like sessionStorage otherwise
let sessionStorage = global.window.sessionStorage;

/**
 * Fake remote server, using bcrypt and sessionStorage to persist data across page
 * reloads
 * @type {Object}
 */
var server = {
  /**
   * Populates the users var, similar to seeding a database in the real world
   */
  init() {
    // Get the previous users from sessionStorage if they exist, otherwise
    // populates the sessionStorage
    if (sessionStorage.users === undefined || !sessionStorage.encrypted) {
      // Set default user
      
      const AzureDiamond = "teacher";
      const AzureDiamondSalt = genSalt(AzureDiamond);
      const AzureDiamondPass = bcrypt.hashSync("teach", AzureDiamondSalt);
      var userInfo = {
        password: bcrypt.hashSync(AzureDiamondPass, salt),
        permission: 2
      };
      users = {
        [AzureDiamond]: userInfo
      };
      sessionStorage.users = JSON.stringify(users);
      sessionStorage.encrypted = true;
    } else {
      users = JSON.parse(sessionStorage.users);
    }
  },
  /**
   * Pretends to log a user in
   *
   * @param {string} username The username of the user to log in
   * @param {string} password The password of the user to register
   * @param {?callback} callback Called after a user is logged in
   */
  login(username, password, callback) {
    const userExists = this.doesUserExist(username);
    // If the user exists and the password fits log the user in
    if (userExists && bcrypt.compareSync(password, users[username]["password"]) && users[username]["permission"]) {
      if (callback) callback({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      });
    } else {
      if (userExists) {
        
        // If the password is wrong, throw the password-wrong error
        if(users[username]["permission"]) {
          var error = {
            type: "password-wrong"
          }
        }
        else {
          var error = {
            type: "permission-not-allowed"
          }
        }
        
      } else {
        // If the user doesn't exist, throw the user-doesnt-exist
        var error = {
          type: "user-doesnt-exist"
        }
      }
      if (callback) callback({
        authenticated: false,
        error: error
      });
    }
  },
  /**
   * Pretends to register a user
   *
   * @param {string} username The username of the user to register
   * @param {string} password The password of the user to register
   * @param {?callback} callback Called after a user is registered
   */
  register(username, password, callback) {
    if (!this.doesUserExist(username)) {
      // If the username isn't used, hash the password with bcrypt to store it
      // in sessionStorage

      fetch('http://localhost:3200/add_user/', {
        method: 'POST',
        body: JSON.stringify({
          name : username, 
          password : bcrypt.hashSync(password, salt),
          permission: 2
          })
        });

      if (callback) callback({
        registered: true
      });
    } else {
      // If the username is already in use, throw the username-exists error
      if (callback) callback({
        registered: false,
        error: {
          type: "username-exists"
        }
      });
    }
  },
  /**
   * Pretends to log a user out
   * @param  {Function} callback Called after the user was logged out
   */
  logout(callback) {
    sessionStorage.removeItem('token');
    if (callback) callback();
  },
  /**
   * Checks if a username exists in the db
   * @param  {string} username The username that should be checked
   * @return {boolean}         True if the username exists, false if it doesn't
   */
  doesUserExist(username) {
    return fetch('http://localhost:3200/exist_user/', {
      method: 'POST',
      body: JSON.stringify({
        name : username
        })
      })
      .then(response => 
      {
        return response.text();
      })
      .then(json => {
        if(json["exist"] > 0)
        {
          return true;
        }
        return false;
      });
      
  }
}

server.init();

module.exports = server;
