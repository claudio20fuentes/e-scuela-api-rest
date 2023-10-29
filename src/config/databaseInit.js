const sequelize = require("./db");

const databaseInit = async () => {
    (async () => {
      try {
        await sequelize.sync({ force: true }); // This line synchronizes your models
        console.log("Models have been synchronized with the database.");
    
        // Run the seeders
        const { exec } = require('child_process');
        exec('npx sequelize db:seed:all --config src/config/config.js --seeders-path src/seeders', (error, stdout, stderr) => {
          if (error) {
            console.error("Error running seeders:", error);
            return;
          }
          console.log("Seeders executed successfully:", stdout);
        });
      } catch (error) {
        console.error("Error synchronizing models:", error);
      }
    })()
  };

module.exports = databaseInit;