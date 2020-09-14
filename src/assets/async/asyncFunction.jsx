const effectAsyncHandler = async (
  path, //  path to make the request
  method, // method to user GET / POST / PATCH
  handler, // handler functions how recives the response and the event
  token, // token of the current user
  currentSignal, // signal for useEffect
  currentBody, // body of the request
  event, // event whom rises the action
) => {
  try {
    if (method === 'GET') {
      // Generalization of get requests
      // needs a handler function that makes the necesaries setups
      // doesn't need body
      const fetchData = await fetch(path, {
        signal: currentSignal,
        method,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (fetchData.status === 400) {
        // eslint-disable-next-line no-console
        console.log('Error de usuario en el request GET');
      } else if (fetchData.status === 200 || fetchData.status === 201) {
        let response = await fetchData.text();
        response = await JSON.parse(response);
        handler(response.data);
      } else {
        // eslint-disable-next-line no-console
        console.log('Error del servidor en el request');
      }
    } else if (token) {
      // For POST and PATCH fetchs how requiers body
      // needs a handler function to check if the response
      // without parsing was correct
      // may need a body
      const response = await fetch(path, {
        signal: currentSignal,
        method,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: currentBody,
      });
      handler(response, event);
    } else {
      // Exclusive for login
      // needs a handler function to check if the response was correct
      // need a body and doesn't need a token
      const fetchData = await fetch(path, {
        method,
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: currentBody,
      });
      let response = await fetchData.text();
      response = await JSON.parse(response);
      handler(response, event);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error', error);
  }
};

export default effectAsyncHandler;
