const user = require('./repositories/user.repository');

async function start() {
  const utilisateurs = await user.findAllUsers();
  console.log('👤 Utilisateurs trouvés :');
  console.log(utilisateurs);
}

start();
