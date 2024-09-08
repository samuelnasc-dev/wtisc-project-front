// loaders.js
const profilePageLoader = async () => {
  const postPromise = apiRequest("/users/profilePosts");
  return defer({
    postResponse: postPromise
  });
};

export default profilePageLoader;  // Exportação padrão
