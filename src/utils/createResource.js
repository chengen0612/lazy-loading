export default function createResource(promise) {
  let error;
  let response;

  const pending = promise
    .then((res) => (response = res))
    .catch((err) => (error = err));

  return {
    read() {
      if (error) throw error;
      if (response) return response;
      throw pending;
    },
  };
}
