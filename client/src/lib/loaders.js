import { defer } from 'react-router-dom'; // Adicione esta linha se ainda não estiver
import apiRequest from './apiRequest'; // Ajuste o caminho se necessário

const profilePageLoader = async () => {
  const postPromise = apiRequest.get('/users/profilePosts'); // Certifique-se de usar o método correto
  return defer({
    postResponse: postPromise
  });
};

export default profilePageLoader;  // Exportação padrão
